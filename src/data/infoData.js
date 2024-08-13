export const infoData = {
    "title": "Personal Information",
    "logoPosition": "right",
    "pages": [
      {
        "name": "Demographic information",
        "title": "Please provide the following personal information",
        "elements": [
          {
            "type": "radiogroup",
            "name": "gender",
            "title": "Gender",
            "isRequired": true,
            "choices": [
              {
                "value": "male",
                "text": "Male"
              },
              {
                "value": "female",
                "text": "Female"
              },
              {
                "value": "nonBinary",
                "text": "Non - Binary"
              },
              {
                "value": "undisclosed",
                "text": "Prefer not to disclose"
              }
            ],
            "showOtherItem": true
          },
          {
            "type": "radiogroup",
            "name": "ethnicity",
            "title": "Please select your ethnicity.",
            "isRequired": true,
            "choices": [
              {
                "value": "Hispanic",
                "text": "Hispanic or Latino"
              },
              {
                "value": "NotHispanic",
                "text": "Not Hispanic or Latino"
              }
            ]
          },
          {
            "type": "radiogroup",
            "name": "ethnicBackground",
            "title": "Which racial or ethnic backgrounds do you most identify with? ",
            "isRequired": true,
            "choices": [
              {
                "value": "AmericanIndian",
                "text": "American Indian or Alaska Native"
              },
              "Asian",
              {
                "value": "Black",
                "text": "Black or African American"
              },
              {
                "value": "NativeHawaiin",
                "text": "Native Hawaiian or Other Pacific Islander"
              },
              {
                "value": "White",
                "text": "White or Alaska Native"
              }
            ]
          },
          {
            "type": "text",
            "name": "age",
            "title": "Age",
            "isRequired": true,
            "inputType": "number"
          },
          {
            "type": "comment",
            "name": "impairment",
            "title": "Briefly describe your impairment level and how you acquired it.",
            "isRequired": true,
            "rows": 2
          },
          {
            "type": "comment",
            "name": "typeOfTechnology",
            "title": "Briefly list which assistive technologies you use for navigating websites or online platforms?",
            "isRequired": true,
            "rows": 2
          },
          {
            "type": "radiogroup",
            "name": "priorExperience",
            "title": "How often do you watch videos with audio description?",
            "isRequired": true,
            "choices": [
              {
                "value": "frequently",
                "text": "Frequently"
              },
              {
                "value": "occasionally",
                "text": "Occasionally"
              },
              {
                "value": "rarely",
                "text": "Rarely"
              },
              {
                "value": "never",
                "text": "Never"
              }
            ]
          },
          {
            "type": "text",
            "name": "question1",
            "title": "Briefly describe the type of video content or genre you watch with descriptions (e.g., how-to videos, cooking videos, films).",
            "isRequired": true
          }
        ]
      }
    ],
    "showPageTitles": true,
    "showCompletedPage": false,
    "completeText": "Submit and proceed"
  }
