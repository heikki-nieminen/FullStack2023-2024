-- CreateTable
CREATE TABLE "QuizUser" (
    "id" SERIAL NOT NULL,
    "quiz_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "score" INTEGER,

    CONSTRAINT "QuizUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnswerUser" (
    "id" SERIAL NOT NULL,
    "answer_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "AnswerUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QuizUser" ADD CONSTRAINT "QuizUser_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizUser" ADD CONSTRAINT "QuizUser_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnswerUser" ADD CONSTRAINT "AnswerUser_answer_id_fkey" FOREIGN KEY ("answer_id") REFERENCES "Answer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnswerUser" ADD CONSTRAINT "AnswerUser_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
