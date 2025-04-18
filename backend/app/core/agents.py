from typing import Any, Dict

from langchain_core.tools import BaseTool
from pydantic import BaseModel, Field


class LinkedInScraperInput(BaseModel):
    url: str = Field(description="The LinkedIn profile URL to scrape")


class PersonaCreatorInput(BaseModel):
    profile_data: Dict[str, Any] = Field(
        description="The profile data to create a persona from"
    )


class LinkedInScraperTool(BaseTool):
    name: str = "linkedin_scraper"
    description: str = "Scrape LinkedIn data from a public profile URL"

    def _run(self, url: str) -> Dict[str, Any]:
        """Run the LinkedIn scraper tool on the given URL."""
        return {
            "name": "John Doe",
            "headline": "Senior Product Manager at Google",
            "experience": [
                {"role": "Product Manager", "company": "Google", "duration": "3 years"},
                {"role": "Consultant", "company": "McKinsey", "duration": "2 years"},
            ],
            "education": "MBA, Stanford University",
            "skills": ["Product Management", "Leadership", "Strategy"],
        }

    async def _arun(self, url: str) -> Dict[str, Any]:
        """Async implementation of the LinkedIn scraper tool."""
        return self._run(url)


class PersonaCreatorTool(BaseTool):
    name: str = "persona_creator"
    description: str = "Generate a professional persona in markdown"

    def _run(self, profile_data: dict) -> str:
        """Create a formatted markdown persona from the profile data."""
        name = profile_data["name"]
        headline = profile_data["headline"]
        experience = profile_data["experience"]
        education = profile_data["education"]
        skills = ", ".join(profile_data["skills"])

        experience_md = "\n".join(
            [
                f"- **{e['role']}** at *{e['company']}* ({e['duration']})"
                for e in experience
            ]
        )

        return f"""
### {name}
**{headline}**

#### Experience
{experience_md}

#### Education
- {education}

#### Skills
{skills}
"""

    async def _arun(self, profile_data: dict) -> str:
        """Async implementation of the persona creator tool."""
        return self._run(profile_data)


async def generate_persona(linkedin_url: str) -> Dict[str, Any]:
    """Generate a professional persona from a LinkedIn URL by directly invoking the tools."""
    linkedin_tool = LinkedInScraperTool()
    persona_tool = PersonaCreatorTool()

    steps = []
    try:
        profile_data = await linkedin_tool._arun(linkedin_url)
        steps.append(
            {"tool": "linkedin_scraper", "input": linkedin_url, "output": profile_data}
        )

        persona = await persona_tool._arun(profile_data)
        steps.append(
            {"tool": "persona_creator", "input": "profile data", "output": persona}
        )

        return {"persona": persona, "steps": steps}
    except Exception as e:
        raise Exception(f"Error generating persona: {str(e)}")
