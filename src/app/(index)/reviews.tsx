import { api } from '@/shared/api'
import { FC } from 'react'
import rehypeParse from 'rehype-parse'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import { unified } from 'unified'

interface Properties {}

const sanitizer = unified()
  .use(rehypeParse)
  .use(rehypeSanitize)
  .use(rehypeStringify)

const Reviews: FC<Properties> = async () => {
  const reviews = await api.getReviews()
  const promises = reviews.map(({ text }) => sanitizer.process(text))
  const texts = await Promise.all(promises)

  return (
    <div className="mb-[243px] grid auto-rows-fr grid-cols-2 gap-[34px] max-md:mb-[164px] max-md:grid-cols-1 max-md:gap-[22px] ">
      {texts.map((text, index) => (
        <div
          className="grid max-w-[468px] content-start gap-5 rounded-[15px] bg-[#D9D9D9] px-[27px] py-5 max-md:px-5 max-md:py-6 "
          key={index}
          dangerouslySetInnerHTML={{ __html: String(text) }}
        />
      ))}
    </div>
  )
}

export default Reviews
