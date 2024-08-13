export const infoData = {
    "title": "Personal Information",
    "logoPosition": "right",
    "pages": [
     {
      "name": "page1",
      "elements": [
       {
        "type": "text",
        "name": "participantCode",
        "title": "Your participant code",
        "isRequired": true
       },
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
          "value": "Item 1",
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
        "type": "checkbox",
        "name": "ethnicBackground",
        "visibleIf": "{ethnicity} = 'NotHispanic'",
        "title": "Which racial or ethnic backgrounds do you identify with? You can select one or more options that apply to you.",
        "isRequired": true,
        "choices": [
         {
          "value": "AmericanIndian",
          "text": "American American Indian or Alaska Native"
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
        "type": "checkbox",
        "name": "typeOfTechnology",
        "title": "Which Assistive Technologies do you use for navigating websites or online platforms?",
        "isRequired": true,
        "choices": [
         {
          "value": "voiceOver",
          "text": "VoiceOver"
         },
         "NVDA",
         "JAWS"
        ],
        "showOtherItem": true
       },
       {
        "type": "checkbox",
        "name": "mostWatchedGenres",
        "title": "Please choose your top three most watched video content genres.",
        "isRequired": true,
        "choices": [
         {
          "value": "vlogs",
          "text": "Vlogs"
         },
         {
          "value": "education",
          "text": "Educational"
         },
         {
          "value": "food",
          "text": "Food and cooking"
         },
         {
          "value": "film",
          "text": "Film and animation"
         },
         {
          "value": "health",
          "text": "Health and fitness"
         },
         {
          "value": "fashion",
          "text": "Fashion and beauty"
         },
         {
          "value": "animals",
          "text": "Pets and animals"
         }
        ],
        "showOtherItem": true,
        "maxSelectedChoices": 3,
        "minSelectedChoices": 3,
        "selectAllText": "Fashion"
       },
       {
        "type": "radiogroup",
        "name": "priorExperience",
        "title": "How often do you watch videos with audio description?",
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
       }
      ]
     }
    ],
    "showPageTitles": false,
    "showCompletedPage": false
   }
// {
//     "title": "Personal Information",
//     "logoPosition": "right",
//     "pages": [
//      {
//       "name": "page1",
//       "elements": [
//        {
//         "type": "text",
//         "name": "participantCode",
//         "title": "Your participant code",
//         "isRequired": true
//        },
//        {
//         "type": "radiogroup",
//         "name": "gender",
//         "title": "Gender",
//         "isRequired": true,
//         "choices": [
//          {
//           "value": "male",
//           "text": "Male"
//          },
//          {
//           "value": "female",
//           "text": "Female"
//          },
//          {
//           "value": "nonBinary",
//           "text": "Non - Binary"
//          },
//          {
//           "value": "Item 1",
//           "text": "Prefer not to disclose"
//          }
//         ],
//         "showOtherItem": true
//        },
//        {
//         "type": "text",
//         "name": "age",
//         "title": "Age",
//         "isRequired": true,
//         "inputType": "number"
//        },
//        {
//         "type": "radiogroup",
//         "name": "impairmentLevel",
//         "title": "What is your level of visual impairment?",
//         "isRequired": true,
//         "choices": [
//          {
//           "value": "total",
//           "text": "Total Blindness – the complete absence of sight."
//          },
//          {
//           "value": "partial",
//           "text": "Legal Blindness – Limited vision or significant visual impairment."
//          },
//          {
//           "value": "functional",
//           "text": "Functional Blindness – Visual impairment severe enough to impact daily activities."
//          }
//         ]
//        },
//        {
//         "type": "boolean",
//         "name": "assistiveTechnology",
//         "title": "Do you utilize any Assistive Technology for navigating websites or online platforms?",
//         "isRequired": true
//        },
//        {
//         "type": "checkbox",
//         "name": "typeOfTechnology",
//         "visibleIf": "{assistiveTechnology} = true",
//         "title": "Which Assistive Technologies do you use?",
//         "isRequired": true,
//         "choices": [
//          {
//           "value": "voiceOver",
//           "text": "VoiceOver"
//          },
//          "NVDA",
//          "JAWS"
//         ],
//         "showOtherItem": true,
//         "showSelectAllItem": true
//        },
//        {
//         "type": "checkbox",
//         "name": "contentPlatform",
//         "title": "What platform do you prefer to watch video content?",
//         "isRequired": true,
//         "choices": [
//          {
//           "value": "tikTok",
//           "text": "TikTok"
//          },
//          {
//           "value": "instagram",
//           "text": "Instagram"
//          },
//          {
//           "value": "youtube",
//           "text": "Youtube"
//          },
//          {
//           "value": "facebook",
//           "text": "Facebook"
//          }
//         ],
//         "showOtherItem": true,
//         "showNoneItem": true,
//         "showSelectAllItem": true
//        },
//        {
//         "type": "checkbox",
//         "name": "question1",
//         "title": "Please choose your top three most watched video content genres.",
//         "isRequired": true,
//         "choices": [
//          {
//           "value": "vlogs",
//           "text": "Vlogs"
//          },
//          {
//           "value": "education",
//           "text": "Educational"
//          },
//          {
//           "value": "food",
//           "text": "Food and cooking"
//          },
//          {
//           "value": "film",
//           "text": "Film and animation"
//          },
//          {
//           "value": "health",
//           "text": "Health and fitness"
//          },
//          {
//           "value": "fashion",
//           "text": "Fashion and beauty"
//          },
//          {
//           "value": "animals",
//           "text": "Pets and animals"
//          }
//         ],
//         "maxSelectedChoices": 3,
//         "minSelectedChoices": 3,
//         "selectAllText": "Fashion"
//        },
//        {
//         "type": "boolean",
//         "name": "question2",
//         "title": "Do you have prior experience with audio descriptions?"
//        }
//       ]
//      }
//     ],
//     "showPageTitles": false,
//     "showCompletedPage": false
//    }