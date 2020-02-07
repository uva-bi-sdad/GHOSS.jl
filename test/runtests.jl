using Test, Documenter, OSSGH

ENV["POSTGIS_HOST"] = get(ENV, "POSTGIS_HOST", "host.docker.internal")
ENV["POSTGIS_PORT"] = get(ENV, "POSTGIS_PORT", "5432")
ENV["GITHUB_TOKEN"] = get(ENV, "GITHUB_TOKEN", "")

opt = Opt("Nosferican",
          ENV["GITHUB_TOKEN"],
          host = ENV["POSTGIS_HOST"],
          port = parse(Int, ENV["POSTGIS_PORT"]))

execute(opt.conn, "DROP SCHEMA IF EXISTS $(opt.schema) CASCADE;")

@testset "OSSGH" begin
    using Documenter, OSSGH
    using OSSGH
    using OSSGH: BaseUtils, Licenses

    DocMeta.setdocmeta!(OSSGH,
                       :DocTestSetup,
                       :(using OSSGH, DataFrames, Printf;
                        opt = Opt("Nosferican",
                                  ENV["GITHUB_TOKEN"],
                                  host = ENV["POSTGIS_HOST"],
                                  port = parse(Int, ENV["POSTGIS_PORT"]));),
                       recursive = true)

    makedocs(sitename = "OSSGH",
             modules = [OSSGH],
             pages = [
                 "Home" => "index.md",
                 "Manual" => "manual.md",
                 "API" => "api.md"
             ],
             source = joinpath("..", "docs", "src"),
             build = joinpath("..", "docs", "build"))
end
