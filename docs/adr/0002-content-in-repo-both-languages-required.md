# Content lives in the repo, and both languages are required

All site content (Milestones, Projects, CV data) lives as typed files in this repo and is validated by a schema. There is no CMS: there is a single author, git gives versioning for free, and an AI agent can add a Project in minutes. The site is bilingual (English default under `/en`, Czech under `/cs`). The schema requires every piece of content in both languages, so the build fails rather than publishing a half-translated site.
