import { ref, onBeforeUnmount } from 'vue'

interface WordFlickerOptions {
  speed: number
  skipDelay: number
}

export const useFlicker = (options: WordFlickerOptions) => {
  const sentences = [
    'Your potential is limitless',
    'Take pride in your progress',
    'Each step forward is a victory',
    'See the beauty in every moment',
    'Every effort brings you closer',
    'Radiate positivity and kindness',
    'Every effort you put in matters',
    'Your journey is worth celebrating',
    'Persistence is the key to success',
    'You are capable of amazing things',
    'Your journey is unique, embrace it',
    'Excellence is a habit, not a trait',
    'Dream big, work hard, stay focused',
    'Embrace the challenge with a smile',
    'Embrace the possibilities of today',
    'Believe in your potential every day',
    'Strive for progress, not perfection',
    'Your resilience defines your success',
    'You are capable of achieving anything',
    'Success begins with a positive mindset',
    'Transform obstacles into opportunities',
    'Seize the day with passion and purpose',
    'Your potential for success is infinite',
    'Celebrate progress, no matter how small',
    'You have the power to shape your future',
    'Make today amazing with your positivity',
    'You have the power to make a difference',
    'Your efforts today will pay off tomorrow',
    'Challenges are stepping stones to success',
    'Face challenges with courage and strength',
    'The only limit is the one you set yourself',
    'Every step forward is a step toward success',
    'Focus on the possibilities, not the obstacles'
  ]

  const flicker = ref<HTMLHeadingElement | null>(null)
  let part = ''
  let offset = 0
  let skipCount = 0
  let forwards = true

  const getRandomSentence = (): string => {
    const randomIndex = Math.floor(Math.random() * sentences.length)
    return sentences[randomIndex]
  }

  let sentence = getRandomSentence()

  const wordFlicker = setInterval(() => {
    if (forwards) {
      if (offset >= sentence.length) {
        ++skipCount
        if (skipCount === options.skipDelay) {
          forwards = false
          skipCount = 0
        }
      }
    } else {
      if (offset === 0) {
        forwards = true
        sentence = getRandomSentence()
        offset = 0
      }
    }
    part = sentence.substr(0, offset)
    if (skipCount === 0) {
      if (forwards) {
        offset++
      } else {
        offset--
      }
    }

    if (flicker.value) {
      flicker.value.textContent = `${part}...`
    }
  }, options.speed)

  onBeforeUnmount(() => {
    clearInterval(wordFlicker)
  })

  return {
    flicker
  }
}
