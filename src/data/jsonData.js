export const json = {
    "title": "Feedback",
    "description": "To what extent do you agree with the following statements?",
    "logoPosition": "right",
    "pages": [
     {
      "name": "page1",
      "elements": [
       {
        "type": "radiogroup",
        "name": "efficient",
        "title": "The audio descriptions made watching the video more efficient",
        "isRequired": true,
        "choices": [
         {
          "value": "stronglyDisagree",
          "text": "Strongly disagree"
         },
         {
          "value": "disagree",
          "text": "Disagree"
         },
         {
          "value": "neutral",
          "text": "Neutral"
         },
         {
          "value": "agree",
          "text": "Agree"
         },
         {
          "value": "stronglyAgree",
          "text": "Strongly Agree"
         }
        ]
       },
       {
        "type": "radiogroup",
        "name": "effective",
        "title": "The information provided in the audio descriptions was effective in helping me understand the visual content of the video.",
        "isRequired": true,
        "choices": [
         {
          "value": "stronglyDisagree",
          "text": "Strongly disagree"
         },
         {
          "value": "disagree",
          "text": "Disagree"
         },
         {
          "value": "neutral",
          "text": "Neutral"
         },
         {
          "value": "agree",
          "text": "Agree"
         },
         {
          "value": "stronglyAgree",
          "text": "Strongly Agree"
         }
        ]
       },
       {
        "type": "radiogroup",
        "name": "enjoyable",
        "title": "The experience of listening to the audio descriptions while watching the videos was enjoyable",
        "isRequired": true,
        "choices": [
         {
          "value": "stronglyDisagree",
          "text": "Strongly disagree"
         },
         {
          "value": "disagree",
          "text": "Disagree"
         },
         {
          "value": "neutral",
          "text": "Neutral"
         },
         {
          "value": "agree",
          "text": "Agree"
         },
         {
          "value": "stronglyAgree",
          "text": "Strongly Agree"
         }
        ]
       },
       {
        "type": "comment",
        "name": "summary",
        "title": "Provide a short summary (3-5 sentences)  of the video. ",
        "isRequired": true
       },
       {
        "type": "comment",
        "name": "anyQuestion",
        "title": "Do you have any questions related to the video?"
       }
      ]
     }
    ],
    "showPageTitles": false,
    "showCompletedPage": false
   }

//{
//     "title": "End of Video Survey",
//     "logoPosition": "right",
//     "pages": [
//      {
//       "name": "page1",
//       "elements": [
//        {
//         "type": "rating",
//         "name": "question1",
//         "title": "How would you rate the detail provided by the audio descriptions?",
//         "isRequired": true,
//         "autoGenerate": false,
//         "rateCount": 4,
//         "rateValues": [
//          {
//           "value": 1,
//           "text": "poor"
//          },
//          {
//           "value": 2,
//           "text": "fair"
//          },
//          {
//           "value": 3,
//           "text": "good"
//          },
//          {
//           "value": 4,
//           "text": "excellent"
//          }
//         ]
//        },
//        {
//         "type": "rating",
//         "name": "question2",
//         "title": "To what extent did the audio descriptions enhance your understanding of the scenes depicted in the videos?",
//         "isRequired": true,
//         "autoGenerate": false,
//         "rateCount": 4,
//         "rateValues": [
//          {
//           "value": 1,
//           "text": "not helpful"
//          },
//          {
//           "value": 2,
//           "text": "somewhat helpful"
//          },
//          {
//           "value": 3,
//           "text": "moderately helpful"
//          },
//          {
//           "value": 4,
//           "text": "very helpful"
//          }
//         ]
//        },
//        {
//         "type": "boolean",
//         "name": "question4",
//         "title": "Did you experience any confusion or ambiguity in understanding the content of the videos due to the audio descriptions?",
//         "isRequired": true
//        },
//        {
//         "type": "text",
//         "name": "question5",
//         "visibleIf": "{question4} = true",
//         "title": "What did you find confusing about the description?",
//         "isRequired": true
//        },
//        {
//         "type": "radiogroup",
//         "name": "question3",
//         "title": "Do you feel that the audio descriptions provided a fair and unbiased depiction of objects, people, and their relationships in the videos?",
//         "isRequired": true,
//         "choices": [
//          {
//           "value": "Item 1",
//           "text": "Yes"
//          },
//          {
//           "value": "Item 2",
//           "text": "No"
//          },
//          {
//           "value": "Item 3",
//           "text": "Cannot tell"
//          }
//         ]
//        },
//        {
//         "type": "radiogroup",
//         "name": "question7",
//         "title": "Did you find the amount of information provided in the audio descriptions to be sufficient for comprehending the content of the videos?",
//         "isRequired": true,
//         "choices": [
//          {
//           "value": "Item 1",
//           "text": "Yes"
//          },
//          {
//           "value": "Item 2",
//           "text": "No"
//          },
//          {
//           "value": "Item 3",
//           "text": "Cannot tell"
//          }
//         ]
//        },
//        {
//         "type": "rating",
//         "name": "question6",
//         "title": "How enjoyable did you find the experience of listening to the audio descriptions while watching the videos?",
//         "autoGenerate": false,
//         "rateCount": 4,
//         "rateValues": [
//          {
//           "value": 1,
//           "text": "not enjoyable"
//          },
//          {
//           "value": 2,
//           "text": "somewhat enjoyable"
//          },
//          {
//           "value": 3,
//           "text": "moderately enjoyable"
//          },
//          {
//           "value": 4,
//           "text": "very enjoyable"
//          }
//         ]
//        }
//       ]
//      }
//     ],
//     "showPageTitles": false,
//     "showCompletedPage": false
//    }