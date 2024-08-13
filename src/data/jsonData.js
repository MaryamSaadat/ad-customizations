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
            "name": "understanding",
            "title": "AI-generated descriptions helped me grasp the main content and visual details of the videos.",
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
            "name": "enjoyment",
            "title": "AI-generated descriptions enhanced the overall enjoyment of the video.",
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
          }
        ]
      }
    ],
    "showPageTitles": false,
    "showCompletedPage": false
  }