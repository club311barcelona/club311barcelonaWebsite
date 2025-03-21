import { GradientText } from "@/components/gradient-text"
import type { PageHeaderProps } from "@/types"

export default function PageHeader({ title, subtitle, accentWord, gradientVariant = "gold" }: PageHeaderProps) {
  const renderTitle = () => {
    if (!accentWord) return title

    const parts = title.split(accentWord)
    return (
      <>
        {parts[0]}
        <GradientText variant={gradientVariant}>{accentWord}</GradientText>
        {parts[1]}
      </>
    )
  }

  return (
    <div className="mx-auto max-w-3xl text-center">
      <h1 className="mb-6 font-playfair text-4xl font-bold text-white md:text-5xl lg:text-6xl">{renderTitle()}</h1>
      {subtitle && <p className="mb-8 text-lg text-white/80">{subtitle}</p>}
    </div>
  )
}

