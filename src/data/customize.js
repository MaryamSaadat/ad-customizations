export const customize = {
    "title": "Audio description customizations",
    "description": "Choose the following customizations for audio descriptions for the video you just watched  ",
    "logoPosition": "right",
    "pages": [
      {
        "name": "page1",
        "elements": [
          {
            "type": "radiogroup",
            "name": "frequency",
            "title": "How frequently do you want the audio descriptions for the video you just watched?  The audio descriptions will be extended audio descriptions.",
            "choices": [
              {
                "value": "seven",
                "text": "7 seconds"
              },
              {
                "value": "fifteen",
                "text": "15 seconds"
              },
              {
                "value": "thirty",
                "text": "30 seconds"
              }
            ],
            "isRequired": true
          },
          {
            "type": "radiogroup",
            "name": "type",
            "title": "What type of audio descriptions would you like for the watched video? ",
            "choices": [
              {
                "value": "concise",
                "text": "Concise: Brief descriptions that only focus on visual elements vital to understanding"
              },
              {
                "value": "complete",
                "text": "Detailed: Longer descriptions with additional visual details"
              }
            ],
            "isRequired": true
          },
          {
            "type": "radiogroup",
            "name": "focus",
            "title": "What focus would you like the audio descriptions to have?",
            "choices": [
              {
                "value": "main",
                "text": "Main focus: audio descriptions only focused on visual elements vital to understanding"
              },
              {
                "value": "characters",
                "text": "Character focus: audio descriptions that provide additional details about character's visual details"
              },
              {
                "value": "environment",
                "text": "Environment focus: audio descriptions that provide additional details about the scenes"
              }
            ],
            "isRequired": true
          },
          {
            "type": "radiogroup",
            "name": "interpretation",
            "title": "Would you like interpretations? Interpretations include subjectivity in the audio descriptions.",
            "choices": [
              {
                "value": "yes",
                "text": "Yes"
              },
              {
                "value": "no",
                "text": "No"
              }
            ],
            "isRequired": true
          }
        ]
      }
    ],
    "completeText": "Submit and proceed to customized videos"
  }