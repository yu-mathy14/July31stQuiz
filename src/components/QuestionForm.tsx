// ================================================
// 問題を入力・登録するフォームを表示するコンポーネント
/* バリデーション付きの作問フォームを管理するコンポーネント */
// ================================================

/* Yupライブラリとreact-hook-formを繋げるアダプターのようなもの */
import { yupResolver } from "@hookform/resolvers/yup";
import { useId } from "react";
import {useForm,type SubmitHandler,} from "react-hook-form";
import * as yup from "yup";

import type { Category, Question,} from "../types";

/* 【型エイリアス】型定義 */
type QuestionFormProps = {
  /* Question型のオブジェクトを親コンポーネントへ渡す */
  onAdd: (question: Question) => void;
};

/* どんなフォームにするのかを型で設計 */
type FormValues = {
  text: string;

  choice1: string;
  choice2: string;
  choice3: string;
  choice4: string;

  correctChoice: "1" | "2" | "3" | "4";

  explanation: string;

  timeLimitSec: number;

  category: Category;
};
/* 検証ルールを準備 */
/* yup.object関数の中にオブジェクトを入れていく */
/* FormValuesの中に入る値の検証ルール */
const schema = yup.object({

  text: yup
    .string()
    .label("問題文")
    /* 前後の空白を削除する */
    .transform((value) => value?.trim())
    .required("${label}は必須入力です。")
    .min(5, "${label}は5文字以上で入力してください。")
    .max(200, "${label}は200文字以内で入力してください。"),

  choice1: yup
    .string()
    .label("選択肢1")
    .required("${label}は必須入力です。")
    .max(60, "${label}は60文字以内で入力してください。"),

  choice2: yup
    .string()
    .label("選択肢2")
    .required("${label}は必須入力です。")
    .max(60, "${label}は60文字以内で入力してください。"),

  choice3: yup
    .string()
    .label("選択肢3")
    .required("${label}は必須入力です。")
    .max(60, "${label}は60文字以内で入力してください。"),

  choice4: yup
    .string()
    .label("選択肢4")
    .required("${label}は必須入力です。")
    .max(60, "${label}は60文字以内で入力してください。")

    /* 【独自ルール(test)】
    4つの選択肢に重複がないことを確認する */
    .test(
      /* 第一引数 開発者が識別するためのテストの名前 */
      "duplicate-choice",
      /* 第二引数 条件を満たさなかったときのエラーメッセージ */
      "選択肢が重複しています。",

      /* 第三引数 valueがtrueならOK, falseならエラー */
      /* value は choice4 の値 */
      function (value) {

        /* choice4以外も取得できる */
        /* this.parent -> フォーム全体の値(test〜category) */
        const {
          choice1,
          choice2,
          choice3,
        } = this.parent;

        /* 全選択肢を格納した配列 */
        const choices = [
          choice1,
          choice2,
          choice3,
          value,
        ];

        /* Setを利用して重複を除外した件数を比較する */
        /* Set(choices)で重複データを自動で消す */
        /* .size -> オブジェクトの要素数、Set(choices)はオブジェクト */
        /* .length -> 配列の要素数、choicesは配列 */
        return new Set(choices).size === choices.length;
      }
    ),

  correctChoice: yup
    /* .mixed -> 決まった値だけ許可したい */
    /* FormValues["correctChoice"]
    -> この項目は"1" "2" "3" "4"だけを扱います */
    .mixed<FormValues["correctChoice"]>()
    .label("正解")

    /* oneOfを使って許可する値を指定する */
    .oneOf(
      ["1", "2", "3", "4"],
      "正解を選択してください。"
    )

    .required("${label}は必須入力です。"),

  explanation: yup
    .string()
    .label("解説")
    .required("${label}は必須入力です。")
    .min(10, "${label}は10文字以上で入力してください。"),

  timeLimitSec: yup
  /* number()を使う場合は、
  required()だけでは空欄をうまく判定できないケースがあるため
  typeError()も一緒に書く */
    .number()
    .label("制限時間")
    /* 空欄で数字に変換できなかった時、意図したエラー文が表示されないことがある */
    /* Yupのデフォルトエラー amount must be a `number` */
    .typeError("${label}は必須入力です。")
    .integer("${label}は整数で入力してください。") // 整数チェック
    .min(5, "${label}は5秒以上で入力してください。")
    .max(120, "${label}は120秒以下で入力してください。")
    .required("${label}は必須入力です。"), // 値が入力されているかの確認

  category: yup
    /* .mixed -> 決まった値だけ許可したい */
    .mixed<Category>()
    .label("カテゴリ")

    /* oneOfを使って許可する値を指定する */
    .oneOf(
      ["JavaScript", "TypeScript", "React"],
      "カテゴリを正しく選択してください。"
    )

    .required("${label}は必須入力です。"),

}).required();

/* Reactコンポーネントを作るための関数 */
export default function QuestionForm({
  /* QuestionFormProps型のオブジェクト */
  /* 初期値設定の必要なし */
  onAdd,
}: QuestionFormProps) {

  const id = useId();

  /* フォーム初期化 */
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({

    /* バリデーションの検証をYupへ委譲する */
    /* resolver -> 定義済みの検証ルールをReact Hook Formへ紐付ける */
    resolver: yupResolver(schema),

  });

  /* サブミット成功時の処理 */
  const onSubmit: SubmitHandler<FormValues> = (data) => {

    /* 【crypto.randomUUID()】選択肢ごとに一意なidを生成し、変数に保存 */
    /* ∵ 各選択肢に一意なIDを付け、correctChoiceIdに同じIDを設定できるようにするため
    -> どの選択肢が正解か」を確実に管理できるようになる */
    const choiceId1 = crypto.randomUUID();
    const choiceId2 = crypto.randomUUID();
    const choiceId3 = crypto.randomUUID();
    const choiceId4 = crypto.randomUUID();

    /* 選択肢を配列としてまとめる */
    const choices = [
      {
        id: choiceId1,
        label: data.choice1,
      },
      {
        id: choiceId2,
        label: data.choice2,
      },
      {
        id: choiceId3,
        label: data.choice3,
      },
      {
        id: choiceId4,
        label: data.choice4,
      },
    ];

    /* 正解として選択された選択肢idを取得する */
    let correctChoiceId = "";

    /* 【switch文】
    正解として選択された番号から対応するidを取得する */
    switch (data.correctChoice) {

      case "1":
        correctChoiceId = choiceId1;
        break;

      case "2":
        correctChoiceId = choiceId2;
        break;

      case "3":
        correctChoiceId = choiceId3;
        break;

      case "4":
        correctChoiceId = choiceId4;
        break;
    }

    /* 親コンポーネントへ問題データを渡す */
    onAdd({
        /* 問題idを生成 */
        id: crypto.randomUUID(),

        /* 問題文 */
        text: data.text,

        /* 選択肢 */
        choices,

        /* 正解の選択肢id */
        correctChoiceId,

        /* 解説 */
        explanation: data.explanation,

        /* 制限時間 */
        timeLimitSec: data.timeLimitSec,

        /* カテゴリ */
        category: data.category,
    
    });

    /* フォームを初期状態へ戻す */
    reset({

      text: "",

      choice1: "",
      choice2: "",
      choice3: "",
      choice4: "",

      correctChoice: undefined,

      explanation: "",

      timeLimitSec: undefined,

      category: undefined,

    });

  };

return (
    <form className="question-form" onSubmit={handleSubmit(onSubmit)}>
      <h2>問題を登録</h2>

      <div className="form-group">
        <label htmlFor={`${id}-text`}>問題文</label>
        <input
          id={`${id}-text`}
          type="text"
          /* registerの中身が"text"のみで済む
          Yupで定義した検証ルールを利用する */
          {...register("text")}
        />
        <p className="error">{errors.text?.message}</p>
      </div>

      <div className="form-group">
        <label htmlFor={`${id}-choice1`}>選択肢1</label>
        <input
          id={`${id}-choice1`}
          type="text"
          {...register("choice1")}
        />
        <p className="error">{errors.choice1?.message}</p>
      </div>

      <div className="form-group">
        <label htmlFor={`${id}-choice2`}>選択肢2</label>
        <input
          id={`${id}-choice2`}
          type="text"
          {...register("choice2")}
        />
        <p className="error">{errors.choice2?.message}</p>
      </div>

      <div className="form-group">
        <label htmlFor={`${id}-choice3`}>選択肢3</label>
        <input
          id={`${id}-choice3`}
          type="text"
          {...register("choice3")}
        />
        <p className="error">{errors.choice3?.message}</p>
      </div>

      <div className="form-group">
        <label htmlFor={`${id}-choice4`}>選択肢4</label>
        <input
          id={`${id}-choice4`}
          type="text"
          {...register("choice4")}
        />
        {/* 【独自ルール(test)】
        選択肢に重複がある場合、この項目へエラーを表示する */}
        <p className="error">{errors.choice4?.message}</p>
      </div>

      <div className="form-group">
        <label htmlFor={`${id}-correctChoice`}>
          正解
        </label>

        <select
          id={`${id}-correctChoice`}
          {...register("correctChoice")}
        >
          <option value="">
            選択してください
          </option>

          <option value="1">
            選択肢1
          </option>

          <option value="2">
            選択肢2
          </option>

          <option value="3">
            選択肢3
          </option>

          <option value="4">
            選択肢4
          </option>
        </select>

        <p className="error">
          {errors.correctChoice?.message}
        </p>
      </div>

      <div className="form-group">
        <label htmlFor={`${id}-explanation`}>
          解説
        </label>

        <textarea
          id={`${id}-explanation`}
          rows={4}
          {...register("explanation")}
        />

        <p className="error">
          {errors.explanation?.message}
        </p>
      </div>

      <div className="form-group">
        <label htmlFor={`${id}-timeLimitSec`}>
          制限時間（秒）
        </label>

        <input
          id={`${id}-timeLimitSec`}
          type="number"

          /* valueAsNumberを指定することで
          number型として取得できる */
          {...register("timeLimitSec", {
            valueAsNumber: true,
          })}
        />

        <p className="error">
          {errors.timeLimitSec?.message}
        </p>
      </div>

      <div className="form-group">
        <label htmlFor={`${id}-category`}>
          カテゴリ
        </label>

        <select
          id={`${id}-category`}
          {...register("category")}
        >
          <option value="">
            選択してください
          </option>

          <option value="JavaScript">
            JavaScript
          </option>

          <option value="TypeScript">
            TypeScript
          </option>

          <option value="React">
            React
          </option>
        </select>

        <p className="error">
          {errors.category?.message}
        </p>
      </div>

      <button type="submit">
        登録する
      </button>
    </form>
  );
}