import Head from "next/head";
import { Inter } from "next/font/google";
import QuestionInput from "@/components/QuestionComponents/QuestionInput";
import QuestionRadio from "@/components/QuestionComponents/QuestionRadio";
import styles from "@/styles/Question.module.scss";
import PageWrapper from "@/components/PageWrapper";
import { getQuestionById } from "@/services/question";

const inter = Inter({ subsets: ["latin"] });

type PropsType = {
  errno: number;
  data?: {
    id: string;
    title: string;
    desc?: string;
    js?: string;
    css?: string;
    isPublished: boolean;
    isDeleted: boolean;
    componentList: Array<any>;
  };
  msg?: string;
};

export default function Question(props: PropsType) {
  const { errno, data, msg = "" } = props;

  // 数据错误
  if (errno !== 0) {
    return (
      <PageWrapper title="错误">
        <h1>错误</h1>
        <p>{msg}</p>
      </PageWrapper>
    );
  }

  const {
    id,
    title = "",
    desc = "",
    isDeleted,
    isPublished,
    componentList = [],
  } = data || {};

  // 已经被删除的，提示错误
  if (isDeleted) {
    return (
      <PageWrapper title={title} desc={desc}>
        <h1>{title}</h1>
        <p>该问卷已经被删除</p>
      </PageWrapper>
    );
  }

  // 尚未发布的，提示错误
  if (!isPublished) {
    return (
      <PageWrapper title={title} desc={desc}>
        <h1>{title}</h1>
        <p>该问卷尚未发布</p>
      </PageWrapper>
    );
  }
  return (
    <PageWrapper title={title} desc={desc}>
      <form method="post" action="/api/answer">
        <input type="hidden" name="questionId" value={id} />
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
  const { id = "" } = context.params;

  // 根据 id 获取问卷数据
  const data = await getQuestionById(id);

  return {
    props: data,
  };
}
