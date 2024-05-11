import Head from "next/head";
import { Inter } from "next/font/google";
import QuestionInput from "@/components/QuestionComponents/QuestionInput";
import QuestionRadio from "@/components/QuestionComponents/QuestionRadio";
import styles from "@/styles/Question.module.scss";
import PageWrapper from "@/components/PageWrapper";

const inter = Inter({ subsets: ["latin"] });

type PropsType = {
  id: string;
};

export default function Question(props: PropsType) {
  return (
    <PageWrapper title="question">
      <form method="post" action="/api/answer">
        <input type="hidden" name="questionId" value={props.id} />
        <div className={styles.componentWrapper}>
          <QuestionInput
            fe_id="c1"
            props={{ title: "输入姓名", placeholder: "palcehoder" }}
          />
        </div>

        <div className={styles.componentWrapper}>
          <QuestionRadio
            fe_id="c2"
            props={{
              title: "性别",
              options: [
                { value: "male", text: "男" },
                { value: "female", text: "女" },
              ],
              value: "male",
              isVertical: true,
            }}
          />
        </div>

        <div className={styles.submitBtnContainer}>
          <button type="submit">提交</button>
        </div>
      </form>
    </PageWrapper>
  );
}

export async function getServerSideProps(context: any) {
  const { id = "id" } = context.params;

  return {
    props: {
      id,
    },
  };
}
