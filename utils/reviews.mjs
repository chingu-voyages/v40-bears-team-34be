import natural from 'natural';
import { removeStopwords } from 'stopword';

const getFilteredReview = (review) => {
    const tokenizer = new natural.WordTokenizer();
    const alphaLowerCase = review.toLowerCase().replace(/[^a-z,A-Z\s]+/g, '');
    const tokenizedReview = tokenizer.tokenize(alphaLowerCase);
    const filteredReview = removeStopwords(tokenizedReview);
    return filteredReview;
};
const findModifiers = (review) => {
    const modifiers = ['no', 'not'];
    const modifierIndexes = [];
    for (const word of modifiers) {
        for (let i = 0; i < review.length; i++) {
            if (review[i] === word) {
                modifierIndexes.push(i);
            }
        }
    }
    return modifierIndexes;
};
const scoreKeywords = (review) => {
    const scores = {
        quiet: { positive: 0, negative: 0 },
        clean: { positive: 0, negative: 0 },
        management: { positive: 0, negative: 0 },
        neighborhood: { positive: 0, negative: 0 },
        crime: { positive: 0, negative: 0 },
        bugs: { positive: 0, negative: 0 },
    };
    const positiveKeywords = ['quiet', 'clean', 'management', 'neighborhood'];
    const negativeKeywords = ['crime', 'bugs'];
    let phrase = [];
    let notNegative = [];
    const indexesOfNegativeModifiers = findModifiers(review);
    if (indexesOfNegativeModifiers.length > 0) {
        for (let i = 0; i < indexesOfNegativeModifiers.length; i++) {
            phrase = review.slice(
                indexesOfNegativeModifiers[i] - 1,
                indexesOfNegativeModifiers + 1
            );
            notNegative = review
                .slice(0, indexesOfNegativeModifiers[i] - 1)
                .concat(review.slice(indexesOfNegativeModifiers + 1));
            console.log(
                'where no or not ',
                indexesOfNegativeModifiers,
                phrase,
                notNegative
            );
            for (const word of positiveKeywords) {
                if (phrase.includes(word)) {
                    scores[word].negative = scores[word].negative + 1;
                }
            }
            for (const word of negativeKeywords) {
                if (phrase.includes(word)) {
                    scores[word].positive = scores[word].positive + 1;
                }
            }
        }
    } else {
        notNegative = review;
    }
    for (const word of positiveKeywords) {
        if (notNegative.includes(word))
            scores[word].positive = scores[word].positive + 1;
    }
    for (const word of negativeKeywords) {
        if (notNegative.includes(word))
            scores[word].negative = scores[word].negative + 1;
    }
    return scores;
};
export { getFilteredReview, scoreKeywords };
