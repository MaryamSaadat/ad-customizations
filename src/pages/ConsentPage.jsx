import React, { useState } from "react";
import {
  Checkbox,
  Button,
  FormControlLabel,
  Typography,
  Box,
  TextField,
} from "@mui/material";
import { Navbar } from "../components";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const ConsentPage = () => {
  const [checked, setChecked] = useState(false);
  const [name, setName] = useState(""); // State for storing name
  const [date, setDate] = useState(""); // State for storing date
  const navigate = useNavigate();

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleProceed = async () => {
    if (checked) {
      if (name.trim() === "" || date.trim() === "") {
        alert("Please provide your name and the date.");
      } else {
        const data = {
          participantName: name,
          dateSigned: date,
          consent:
            "I confirm that I have the eligibility criteria and I consent to participate in this study.",
        };
        const consentRef = collection(db, "consent");
        try {
          await addDoc(consentRef, data);
          navigate("/Info");
        } catch (err) {
          console.error("This is my error:", err);
        }
      }
    } else {
      alert("Please agree to terms and conditions");
    }
  };

  return (
    <>
      <Navbar text="CONSENT TO PARTICIPATE IN RESEARCH" />
      <Box
        component="main"
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="center"
        textAlign="left"
        padding={10}
      >
        <Typography variant="h6" tabIndex={0}>
          Introduction:
        </Typography>
        <Typography variant="body1" tabIndex={0}>
          You are invited to take part in a research study being conducted by
          Sri Kurniawan from the department of Computational Media at the
          University of California, Santa Cruz and Pooyan Fazli and Hasti Seifi
          at Arizona State University. Before you decide whether or not to
          participate in the study, you should read this form and ask questions
          if there is anything that you do not understand. There will be about
          20 blind and low vision participants in this study.
        </Typography>
        <Typography variant="h6" tabIndex={0}>
          Purpose:
        </Typography>
        <Typography variant="body1" tabIndex={0}>
          The purpose of the study is to evaluate AI-generated customized
          descriptions for YouTube videos for users with blindness and visual
          impairments.
        </Typography>
        <Typography variant="h6" tabIndex={0}>
          What you will do in the study?
        </Typography>
        <Typography variant="body1" tabIndex={0}>
          For this study, we would like to ask you to view and rate various
          audio descriptions.
          <br />
          The study will consist of two parts:
          <ol tabIndex={0}>
            <li>
              You will be asked to fill out a short demographic questionnaire at
              the start.
            </li>
            <li>
              You will complete an online survey. You will watch a few short
              videos. For each video, you will watch it a few times with
              different variations of descriptions. After watching each video,
              you will provide ratings based on a few different metrics. The
              expected time spent on the survey is about 25-30 minutes,
              including watching the videos with different customizations of the
              descriptions, and rating the descriptions according to the
              evaluation metrics.
            </li>
          </ol>
        </Typography>
        <Typography variant="h6" tabIndex={0}>
          Time Required:
        </Typography>
        <Typography variant="body1" tabIndex={0}>
          Your participation will take about 25-30 minutes.
        </Typography>
        <Typography variant="h6" tabIndex={0}>
          Risks or Discomforts:
        </Typography>
        <Typography variant="body1" tabIndex={0}>
          There is a risk of loss of privacy. However, no names or identities
          will be used in any published reports of the research. Only the
          researcher will have access to the research data. There is no
          potential for you to experience risks related to the political, social
          or economic context in which you live.
        </Typography>
        <Typography variant="h6" tabIndex={0}>
          What benefits can be reasonably expected?
        </Typography>
        <Typography variant="body1" tabIndex={0}>
          Although there will be no direct benefit to you for taking part in
          this study, the study investigators may learn more about how to design
          tools that are useful in providing information about a video for blind
          and low vision users.
        </Typography>
        <Typography variant="h6" tabIndex={0}>
          What happens if you change your mind about participating?
        </Typography>
        <Typography variant="body1" tabIndex={0}>
          If you decide that you no longer wish to continue in this study, you
          will be requested to: leave the study setup.
          <br />
          You will be told if any important new information is found during the
          course of this study that may affect your wanting to continue.
        </Typography>
        <Typography variant="h6" tabIndex={0}>
          Can you be withdrawn from the study without your consent?
        </Typography>
        <Typography variant="body1" tabIndex={0}>
          You may be withdrawn from the study if you do not follow the
          instructions given you by the study investigators.
        </Typography>
        <Typography variant="h6" tabIndex={0}>
          Confidentiality:
        </Typography>
        <Typography variant="body1" tabIndex={0}>
          This research is covered by a Certificate of Confidentiality from the
          National Institutes of Health. This means that the researchers cannot
          release or use information, documents, or samples that may identify
          you in any action or suit unless you say it is okay. They also cannot
          provide them as evidence unless you have agreed. This protection
          includes federal, state, or local civil, criminal, administrative,
          legislative, or other proceedings. An example would be a court
          subpoena.
          <br />
          There are some important things that you need to know. The Certificate
          DOES NOT stop reporting that federal, state or local laws require.
          Some examples are laws that require reporting of child or elder abuse,
          some communicable diseases, and threats to harm yourself or others.
          The Certificate CANNOT BE USED to stop a sponsoring United States
          federal or state government agency from checking records or evaluating
          programs. The Certificate DOES NOT stop disclosures required by the
          federal Food and Drug Administration (FDA). The Certificate also DOES
          NOT prevent your information from being used for other research if
          allowed by federal regulations.
          <br />
          Researchers may release information about you when you say it is okay.
          For example, you may give them permission to release information to
          insurers, medical providers or any other persons not connected with
          the research. The Certificate of Confidentiality does not stop you
          from willingly releasing information about your involvement in this
          research. It also does not prevent you from having access to your own
          information.
          <br />
          The research data will be kept in a secure location and only the
          researcher will have access to the data. All research data will be
          stored in an encrypted document on a password-protected computer. All
          research data will be stored in a device with full disk encryption and
          password protection. The data may be used in the future only for
          research purposes consistent with the original purpose of the research
          stated in this consent. Any identifiable information will be kept
          locked in the faculty member’s office.
          <br />
          The information that you give in the study will be anonymous. Your
          name will not be collected or linked to your answers.
          <br />
          Your responses will be assigned a code number. The list connecting
          your name to this code will be kept in an encrypted and password
          protected file. Only the study investigators will have access to the
          file. When the study is completed and the data have been analyzed, the
          list linking identifiable information to the study data will be
          destroyed.
          <br />
          While the study investigators follow procedures to maintain your
          confidentiality, as with any internet activity, we cannot guarantee
          confidentiality of interception of data sent via the Internet by any
          third parties.
          <br />
        </Typography>
        <Typography variant="h6" tabIndex={0}>
          Compensation:
        </Typography>
        <Typography variant="body1" tabIndex={0}>
          You will receive $25 Amazon gift certificate for participating in this
          study.
        </Typography>
        <Typography variant="h6" tabIndex={0}>
          Are there any costs associated with participating in this study?
        </Typography>
        <Typography variant="body1" tabIndex={0}>
          There will be no cost to you for participating in this study.
        </Typography>
        <Typography variant="h6" tabIndex={0}>
          What if you are injured as a direct result of being in this study?
        </Typography>
        <Typography variant="body1" tabIndex={0}>
          If this study causes you any injury, you should write or call Sri
          Kurniawan at 831-459-1037.
        </Typography>
        <Typography variant="h6" tabIndex={0}>
          Voluntary Participation:
        </Typography>
        <Typography variant="body1" tabIndex={0}>
          Your participation is completely voluntary; you are free to change
          your mind at any time and quit the study.
          <br />
          You may skip any questions you do not wish to answer. Whatever you
          decide will in no way penalize you or result in loss of benefits or
          services to which you are otherwise entitled.
          <br />
          You can withdraw at any time by simply leaving the interview. You are
          free to not respond to any question(s) you do not wish to answer.
          Whatever you decide will in no way penalize you or result in loss of
          benefits or services to which you are otherwise entitled.
          <br />
          You will not receive a partial payment for the study.
        </Typography>
        <Typography variant="h6" tabIndex={0}>
          Rights and Concerns:
        </Typography>
        <Typography variant="body1" tabIndex={0}>
          If you have questions about this research study, please contact Maryam
          Cheema (mcheema2@asu.edu). If you have any questions regarding your
          rights as a research participant, please contact the University of
          California Santa Cruz, Office of Research Compliance Administration at
          831-459-1473 or orca@ucsc.edu.
        </Typography>
        <Typography variant="h6" tabIndex={0}>
          Participant Information:
        </Typography>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={handleNameChange}
          aria-label="Participant Name"
          sx={{ marginBottom: 2 }}
          required
          inputProps={{
            "aria-describedby": "name-description",
          }}
        />
        <TextField
          type="date"
          variant="outlined"
          value={date}
          onChange={handleDateChange}
          aria-label="Enter today's date"
          sx={{ marginBottom: 2 }}
          required
          inputProps={{
            "aria-describedby": "date-description",
          }}
        />
        <FormControlLabel
          sx={{ marginTop: "20px" }}
          control={
            <Checkbox
              checked={checked}
              onChange={handleChange}
              aria-label="Consent to participate"
            />
          }
          label="I confirm that I have the eligibility criteria and I consent to participate in this study."
        />
        <Button
          variant="contained"
          color="primary"
          aria-label="Proceed to the user study"
          sx={{
            fontSize: "1rem",
            marginTop: "1rem",
            fontWeight: "bold",
          }}
          onClick={handleProceed}
          disabled={!checked}
        >
          Proceed to user study
        </Button>
      </Box>
    </>
  );
};

export default ConsentPage;
