import React, { ChangeEvent, FC } from 'react'

import { InputRadio } from 'common/inputRadio/InputRadio'
import s from 'features/learn/Learn.module.css'

type GradePropsType = {
  setCurrentGrade: (grade: number) => void
}

const grades = ['Did not know', 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer']

export const Grade: FC<GradePropsType> = ({ setCurrentGrade }) => {
  const updateGrade = (e: ChangeEvent<HTMLInputElement>) => {
    const grade = e.target.value

    setCurrentGrade(grades.findIndex(g => g === grade) + 1)
  }

  return (
    <div className={s.rate}>
      <p>
        <b>Rate yourself:</b>
      </p>
      <ul>
        {grades.map((grade, i) => {
          return (
            <li key={i}>
              <InputRadio name={'grade'} id={'grade' + i} onChange={updateGrade} value={grade} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
