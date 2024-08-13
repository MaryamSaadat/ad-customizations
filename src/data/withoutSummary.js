export const withOutSummary = {
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
        "name": "anyQuestion",
        "title": "Do you have any questions related to the video?"
       }
      ]
     }
    ],
    "showPageTitles": false,
    "showCompletedPage": false
   }