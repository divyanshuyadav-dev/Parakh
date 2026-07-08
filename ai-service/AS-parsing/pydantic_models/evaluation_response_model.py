from __future__ import annotations

from enum import Enum
from typing import List

from pydantic import BaseModel, Field

# ENUMS
class PaperClarity(str, Enum):
    CLEAR = "clear"
    PARTIALLY_CLEAR = "partially_clear"
    UNCLEAR = "unclear"


class AttemptStatus(str, Enum):
    ATTEMPTED = "attempted"
    PARTIAL = "partial"
    CROSSED_OUT = "crossed_out"
    UNCERTAIN = "uncertain"

# BASIC MODELS
class StudentMetadata(BaseModel):
    name: str = ""
    rollNumber: str = ""
    examCode: str = ""
    subject: str = ""


class EarnedMarks(BaseModel):
    value: float = Field(
        description="Marks awarded for this answer."
    )

    reason: str = Field(
        default="",
        description="Short explanation for marks awarded."
    )


class ParsingStatus(BaseModel):
    success: bool

    paperClarity: PaperClarity

    overallConfidence: float = Field(
        ge=0,
        le=1
    )

    errors: List[str] = Field(default_factory=list)

    warnings: List[str] = Field(default_factory=list)


# RECURSIVE ANSWER BLOCK
class AnswerBlock(BaseModel):
    id: str

    sourcePages: List[int] = Field(default_factory=list)

    attemptStatus: AttemptStatus

    confidence: float = Field(
        ge=0,
        le=1
    )

    errors: List[str] = Field(default_factory=list)

    warnings: List[str] = Field(default_factory=list)

    issues: List[str] = Field(default_factory=list)

    answerSummary: str = Field(
        description="Concise semantic understanding of the student's answer."
    )

    satisfies: List[str] = Field(default_factory=list)

    missing: List[str] = Field(default_factory=list)

    earnedMarks: EarnedMarks

    children: List["AnswerBlock"] = Field(default_factory=list)


AnswerBlock.model_rebuild()


# ATTEMPT SUMMARY
class AttemptSummary(BaseModel):
    totalAnswerBlocks: int

    attemptedQuestionIds: List[str] = Field(default_factory=list)


# ROOT
class EvaluationOutput(BaseModel):
    studentMetadata: StudentMetadata

    parsingStatus: ParsingStatus

    answerBlocks: List[AnswerBlock] = Field(default_factory=list)

    invalidAnswers: List[str] = Field(default_factory=list)

    attemptSummary: AttemptSummary