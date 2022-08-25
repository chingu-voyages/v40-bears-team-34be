import natural from "natural"
import {removeStopwords} from "stopword"
import reviews from './reviewsample.js'

const getFilteredReview = (review) => {
  const tokenizer = new natural.WordTokenizer()
  const alphaLowerCase = review.text.toLowerCase().replace(/[^a-z,A-Z\s]+/g, '')
  const tokenizedReview = tokenizer.tokenize(alphaLowerCase)
  const filteredReview = removeStopwords(tokenizedReview)
  return filteredReview
}

const scoreKeywords = (review) => {
  const scores = {"quiet": 0, "clean": 0, "management": 0, "neighborhood": 0, "crime": 0, "bugs": 0}                                                               
  const positiveKeywords = ['quiet', 'clean', 'management','neighborhood']
  const negativeKeywords = ['crime', 'bugs']
  for (const word of positiveKeywords) {
    if (review.includes(word))
      scores[word] = scores[word] + 1
  }
  for (const word of negativeKeywords) {
    if (review.includes(word))
      scores[word] = scores[word] - 1
  }
  return scores
}
const totalAllScores = (reviews) => {
  const totalScores = {"quiet": 0, "clean": 0, "management": 0, "neighborhood": 0, "crime": 0, "bugs": 0}
  for (let i = 0; i < reviews.length; i++) {
    // console.log(`Review ${i} is `,scoreKeywords(getFilteredReview(reviews[i])))
    const reviewScores = scoreKeywords(getFilteredReview(reviews[i]))
    for (const score in totalScores) {
      totalScores[score] = totalScores[score] + reviewScores[score]
    }
}
  return totalScores
}

console.log(totalAllScores(reviews))

