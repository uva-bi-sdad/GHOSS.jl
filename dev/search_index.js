var documenterSearchIndex = {"docs":
[{"location":"api/#API","page":"API","title":"API","text":"","category":"section"},{"location":"api/#Public","page":"API","title":"Public","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"Modules = [GHOST, BaseUtils, Licenses, Search, Repos, Commits]\nPrivate = false","category":"page"},{"location":"api/#Private","page":"API","title":"Private","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"Modules = [GHOST, BaseUtils, Licenses, Search, Repos, Commits]\nPublic = false","category":"page"},{"location":"manual/#Manual","page":"Manual","title":"Manual","text":"","category":"section"},{"location":"manual/#Getting-Started","page":"Manual","title":"Getting Started","text":"","category":"section"},{"location":"manual/","page":"Manual","title":"Manual","text":"GHOST.jl can be installed from the repository through:","category":"page"},{"location":"manual/","page":"Manual","title":"Manual","text":"using Pkg\nPkg.add(url = \"https://github.com/uva-bi-sdad/GHOST.jl\")","category":"page"},{"location":"manual/","page":"Manual","title":"Manual","text":"to load the package, use","category":"page"},{"location":"manual/","page":"Manual","title":"Manual","text":"using GHOST","category":"page"},{"location":"manual/#Licenses","page":"Manual","title":"Licenses","text":"","category":"section"},{"location":"manual/","page":"Manual","title":"Manual","text":"GitHub can recognize certain licenses for repositories per their documentation. We filter out the machine-detectable licenses that are approved by the Open Source Initiative based on the SPDX Working Group SPDX License List data.","category":"page"},{"location":"manual/","page":"Manual","title":"Manual","text":"info: Info\nSPDX stands for Software Package Data Exchange open standard for communicating software bill of material information (including components, licenses, copyrights, and security references).","category":"page"},{"location":"manual/","page":"Manual","title":"Manual","text":"The following licenses are machine-detectable OSI-approved licenses.","category":"page"},{"location":"manual/","page":"Manual","title":"Manual","text":"SPDX Name\n0BSD BSD Zero Clause License\nAFL-3.0 Academic Free License v3.0\nAGPL-3.0 GNU Affero General Public License v3.0\nApache-2.0 Apache License 2.0\nArtistic-2.0 Artistic License 2.0\nBSD-2-Clause BSD 2-Clause \"Simplified\" License\nBSD-3-Clause BSD 3-Clause \"New\" or \"Revised\" License\nBSL-1.0 Boost Software License 1.0\nCECILL-2.1 CeCILL Free Software License Agreement v2.1\nECL-2.0 Educational Community License v2.0\nEPL-1.0 Eclipse Public License 1.0\nEPL-2.0 Eclipse Public License 2.0\nEUPL-1.1 European Union Public License 1.1\nEUPL-1.2 European Union Public License 1.2\nGPL-2.0 GNU General Public License v2.0 only\nGPL-3.0 GNU General Public License v3.0 only\nISC ISC License\nLGPL-2.1 GNU Lesser General Public License v2.1 only\nLGPL-3.0 GNU Lesser General Public License v3.0 only\nLPPL-1.3c LaTeX Project Public License v1.3c\nMIT MIT License\nMPL-2.0 Mozilla Public License 2.0\nMS-PL Microsoft Public License\nMS-RL Microsoft Reciprocal License\nNCSA University of Illinois/NCSA Open Source License\nOFL-1.1 SIL Open Font License 1.1\nOSL-3.0 Open Software License 3.0\nPostgreSQL PostgreSQL License\nUPL-1.0 Universal Permissive License v1.0\nUnlicense The Unlicense\nZlib zlib License","category":"page"},{"location":"manual/#Collection-Strategy","page":"Manual","title":"Collection Strategy","text":"","category":"section"},{"location":"manual/#Universe","page":"Manual","title":"Universe","text":"","category":"section"},{"location":"manual/","page":"Manual","title":"Manual","text":"We are interested in finding every repository on GitHub that fits the following criteria:","category":"page"},{"location":"manual/","page":"Manual","title":"Manual","text":"Is public\nHas a machine detectable OSI-approved license\nIs not a fork\nIs not a mirror\nIs not archived","category":"page"},{"location":"manual/","page":"Manual","title":"Manual","text":"info: Info\nThe oldest repository by creation time on GitHub dates back to 2007-10-29T14:37:16+00.","category":"page"},{"location":"manual/","page":"Manual","title":"Manual","text":"In the GitHub search syntax the following criteria is denoted by","category":"page"},{"location":"manual/","page":"Manual","title":"Manual","text":"{\n  search(query: \"is:public fork:false mirror:false archived:false license:$spdx created:2007-10-29T14:37:16+00..2020-01-01T00:00:00+00\", type: REPOSITORY) {\n    repositoryCount\n  }\n}","category":"page"},{"location":"manual/","page":"Manual","title":"Manual","text":"where $spdx a license keyword (e.g., mit).","category":"page"},{"location":"manual/","page":"Manual","title":"Manual","text":"!!! Warning","category":"page"},{"location":"manual/","page":"Manual","title":"Manual","text":"GitHub only allows to query up to 1,000 results per search connection result.\nIf a query returns over 1,000 results, only the first 1,000 are accessible.\nIn order to be able to collect every repository of interest we query based on:\n    - license (e.g., `spdx:mit`)\n    - when it was created (e.g., `created:2010-01-01T00:00:00+00..2010-02-01T00:00:00+00`)\nWe shrink intervals until the result count is 1,000 or fewer.","category":"page"},{"location":"manual/","page":"Manual","title":"Manual","text":"created:2010-01-01T00:00:00+00..2010-01-01T12:00:00+00 1,850\n\ncreated:2010-01-01T00:00:00+00..2010-01-01T12:00:00+00 998\ncreated:2010-01-01T12:00:00+00..2010-01-02T00:00:00+00 952","category":"page"},{"location":"manual/","page":"Manual","title":"Manual","text":"We then prune intervals to obtain the least amount of valid intervals that cover the full time period.","category":"page"},{"location":"manual/","page":"Manual","title":"Manual","text":"For example,","category":"page"},{"location":"manual/","page":"Manual","title":"Manual","text":"spdx created count asof done\nzlib [\"2007-10-29 00:00:00\",\"2014-09-04 00:00:00\") 999 2020-05-14 18:48:03 FALSE\nzlib [\"2014-09-04 00:00:00\",\"2016-12-09 00:00:00\") 998 2020-05-14 18:48:03 FALSE\nzlib [\"2016-12-09 00:00:00\",\"2018-12-21 00:00:00\") 998 2020-05-14 18:48:03 FALSE\nzlib [\"2018-12-21 00:00:00\",\"2020-01-01 00:00:00\") 562 2020-05-14 18:48:03 FALSE","category":"page"},{"location":"manual/","page":"Manual","title":"Manual","text":"info: Info\nThis is table gh_2007_2021.queries.","category":"page"},{"location":"manual/","page":"Manual","title":"Manual","text":"The queries table is used to store the queries and track their status. Once all the records have been obtained for the repos table their done status becomes TRUE.","category":"page"},{"location":"manual/#Repository-base-branch","page":"Manual","title":"Repository base branch","text":"","category":"section"},{"location":"manual/","page":"Manual","title":"Manual","text":"The commit data for a Git repository is dependent on the base branch.","category":"page"},{"location":"manual/","page":"Manual","title":"Manual","text":"The repos table contains the GitHub repository global node ID and the global node ID for the base branch of the repository.","category":"page"},{"location":"manual/","page":"Manual","title":"Manual","text":"id basebranchid asof status\nMDEwOlJlcG9zaXRvcnkyMzgzNTcxMTI= MDM6UmVmMjM4MzU3MTEyOm1hc3Rlcg== 2020-05-14 19:49:10+00 Ready","category":"page"},{"location":"manual/","page":"Manual","title":"Manual","text":"info: Info\nThis is table gh_2007_2021.repos.","category":"page"},{"location":"manual/","page":"Manual","title":"Manual","text":"The various status values include:","category":"page"},{"location":"manual/","page":"Manual","title":"Manual","text":"Ready: We will commence collecting commit data from it.\nUnavailable: Repository is not accessible (e.g., deleted of made private NOT_FOUND, DMCA takedown)\nError: Something weird happened such as someone Git force pushing and changing the history during the scrape process.","category":"page"},{"location":"manual/#Commits","page":"Manual","title":"Commits","text":"","category":"section"},{"location":"manual/","page":"Manual","title":"Manual","text":"For each repository, we query the commit data based on the time coverage of the data collection.","category":"page"},{"location":"manual/","page":"Manual","title":"Manual","text":"The commits table contains this data and is used to update the status of the repository commit data at the repos table.","category":"page"},{"location":"manual/","page":"Manual","title":"Manual","text":"note: Note\nCommit users may show with a NULL login which indicates that the commit email does not match those associated with any GitHub account.","category":"page"},{"location":"manual/","page":"Manual","title":"Manual","text":"note: Note\nCommit timestamps sometimes may have have strange dates dating back before the creation of version control (usually the Epoch time). For those commits, we replace the value with the earliest commit date in that repository that seems valid.","category":"page"},{"location":"manual/#Relational-Database","page":"Manual","title":"Relational Database","text":"","category":"section"},{"location":"manual/","page":"Manual","title":"Manual","text":"Table Column Description\nlicenses spdx Software Package Data Exchange License ID\nlicenses name Name of the license\nqueries spdx The SPDX license ID\nqueries created The time interval for the query\nqueries count How many results for the query\nqueries asof When was GitHub queried about the information.\nqueries done Has the repositories been collected?\nrepos id Repository ID\nrepos spdx SPDX license ID\nrepos slug Location of the respository\nrepos createdat When was the repository created on GitHub?\nrepos description Description of the respository\nrepos primarylanguage Primary language of the respository\nrepos branch Base branch ID\nrepos commits Number of commits in the branch until the end of the observation period\nrepos asof When was GitHub queried?\nrepos status Status of collection effort\ncommits branch Base Branch ID (foreign key)\ncommits id Commit ID\ncommits oid Git Object ID (SHA1)\ncommits committedat When was it committed?\ncommits authors_email The email in the Git commit.\ncommits authors_name The name in the Git commit.\ncommits authors_id GitHub Author\ncommits additions The number of additions in this commit.\ncommits deletions The number of deletions in this commit.\ncommits asof When was GitHub queried.","category":"page"},{"location":"manual/#How-To-Use","page":"Manual","title":"How To Use","text":"","category":"section"},{"location":"manual/","page":"Manual","title":"Manual","text":"In order to use this package, refer to API section in the documentation, the examples in the test suite, the CI and pipeline scripts.","category":"page"},{"location":"manual/","page":"Manual","title":"Manual","text":"info: Info\nAdditional documentation is forthcoming once the API interface is stabilized.","category":"page"},{"location":"manual/#Requirements","page":"Manual","title":"Requirements","text":"","category":"section"},{"location":"manual/","page":"Manual","title":"Manual","text":"GitHub Personal Access Tokens with public access\nJulia v1 (current release v1.5.3)\nA PostgreSQL database connection (tested with v11-v13)","category":"page"},{"location":"#GHOST.jl","page":"Introduction","title":"GHOST.jl","text":"","category":"section"},{"location":"","page":"Introduction","title":"Introduction","text":"GHOST.jl is an open-sourced Julia package to collect and track GitHub activity as well as user information particularly useful for software analytic and socio-economic research. It addresses an unmet need for collecting variables currently missing from other existing projects (e.g., license information, multiple authors per commits, lines added/deleted, Twitter accounts). A significant contribution is the use of the GitHub v4 GraphQL API as opposed to the REST API, which allows major gains in the efficiency of the collection process. A component of the implementation design is that it does not aim to be comprehensive but selective in what data to capture while allowing methods to re-use data already available through other projects.","category":"page"}]
}