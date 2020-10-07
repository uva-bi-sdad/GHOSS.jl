using GHOSS
setup()
using GHOSS: @unpack, load!
@unpack conn, schema, pat = GHOSS.PARALLELENABLER

data = execute(conn,
               String(read(joinpath(dirname(pathof(GHOSS)), "assets", "sql", "branches_min_max.sql"))) |>
                   (obj -> replace(obj, "schema" => schema)) |>
                   (obj -> replace(obj, "min_lim" => 0)) |>
                   (obj -> replace(obj, "max_lim" => 10)),
               not_null = true) |>
    (obj -> getproperty.(obj, :branch))

query_commits_repos_1_10(view(data, 1:100))
