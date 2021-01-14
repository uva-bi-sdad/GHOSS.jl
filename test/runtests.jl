using Test, GHOST

pats = [ GitHubPersonalAccessToken(split(pat, ':')...) for pat in filter!(!isempty, split(ENV["GH_PAT"], '\n')) ]
@testset "Basic Pipeline" begin
    setup(pats = pats)
    licenses()
    setup_parallel(2)
    spdxs = execute(GHOST.PARALLELENABLER.conn,
                    "SELECT spdx FROM $(GHOST.PARALLELENABLER.schema).licenses where spdx = ANY('{EUPL-1.2,UPL-1.0}'::text[]) ORDER BY spdx;",
                    not_null = true) |>
        (obj -> getproperty.(obj, :spdx))
    for spdx in spdxs
        queries(spdx)
    end
    data = execute(GHOST.PARALLELENABLER.conn,
                   String(read(joinpath(pkgdir(GHOST), "src",  "assets", "sql", "queries_batches.sql"))),
                   not_null = true) |>
        DataFrame |>
        (df -> groupby(df, [:queries, :query_group]));
    low = minimum(sum(subdf.queries) for subdf in data)
    data = data[findfirst(subdf -> sum(subdf.queries) == low, data)]
    find_repos(data)
    data = execute(GHOST.PARALLELENABLER.conn,
                   String(read(joinpath(dirname(pathof(GHOST)), "assets", "sql", "branches_min_max.sql"))) |>
                       (obj -> replace(obj, "schema" => GHOST.PARALLELENABLER.schema)) |>
                       (obj -> replace(obj, "min_lim" => 1)) |>
                       (obj -> replace(obj, "max_lim" => 2)),
                   not_null = true) |>
        (obj -> getproperty.(obj, :branch))
    query_commits(data, 3)
    println("So far so good!")
    chk = execute(GHOST.PARALLELENABLER.conn,
                  "SELECT count(*) = 1 success FROM $(GHOST.PARALLELENABLER.schema).queries WHERE done;",
                  not_null = true) |>
        (obj -> getproperty.(obj, :success)) |>
        only
    @test chk
end
