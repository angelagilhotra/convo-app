import Session from "./Session";
import { useState } from "react";
import FieldLabel from "../../StrongText";
import type {
  DateTimeHandleChangeType,
  DateTimeHandleDeleteType,
} from "./DateTime";
import type { Session as SessionType } from "..";
import _ from "lodash";

export type HandleResetSessionsType = (flag: boolean) => void;

const SessionsInput = ({
  handleChange,
  danger,
}: {
  handleChange: (sessions: Array<SessionType>) => void;
  danger?: boolean;
}) => {
  const [isRecurring, setIsRecurring] = useState<boolean>(false);
  const [sessions, setSessions] = useState<Array<SessionType>>([
    {
      dateTime: new Date(),
      duration: 1,
      count: 0,
    },
  ]);

  const handleSetSessions: DateTimeHandleChangeType = (type, count, value) => {
    let sessionToUpdate = sessions.find((s) => s.count === count);
    console.log({ sessionToUpdate });
    switch (type) {
      case "dateTime": {
        // @help converting value to string only to satisfy ts error
        // `value` can either be number (for duration) or Date (for dateTime)
        const dateTime = new Date(value.toString());

        // new session, add to array
        if (!sessionToUpdate) {
          const updatedSessions = sessions.concat([
            {
              dateTime,
              duration: 1,
              count,
            },
          ]);
          handleChange(updatedSessions);
          return setSessions(updatedSessions);
        }

        // editing a session
        sessionToUpdate = Object.assign(sessionToUpdate, { dateTime });
        const updatedSessions = _.compact(
          sessions.map((s, index) => (index === count ? sessionToUpdate : s))
        );

        handleChange(updatedSessions);
        return setSessions(updatedSessions);
      }
      case "duration": {
        // @help converting value to string only to satisfy ts error
        // `value` can either be number (for duration) or Date (for dateTime)
        const duration = Number(value);

        // new session, add to array
        if (!sessionToUpdate) {
          const updatedSessions = sessions.concat([
            {
              dateTime: new Date(),
              duration: 1,
              count,
            },
          ]);
          handleChange(updatedSessions);
          return setSessions(updatedSessions);
        }

        // editing a session
        sessionToUpdate = { ...sessionToUpdate, duration };

        const updatedSessions = _.compact(
          sessions.map((s) => (s.count === count ? sessionToUpdate : s))
        );

        handleChange(updatedSessions);
        return setSessions(updatedSessions);
      }
    }
  };

  const handleDelete: DateTimeHandleDeleteType = (count) => {
    const updatedSessions = sessions.filter((s) => s.count !== count);
    handleChange(updatedSessions);
    return setSessions(updatedSessions);
  };

  const handleCheckBox = () => {
    setIsRecurring((recurring) => {
      const flag = !recurring;
      console.log("resetting form here", flag);
      if (!flag && sessions[0]) {
        // user unchecked the "is recurring session" checkbox
        // reset all sessions here
        // remove all but first element in `sessions` array
        const updatedSessions = [sessions[0]];
        handleChange(updatedSessions);
        setSessions(updatedSessions);
      }
      return flag;
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center gap-10">
        <FieldLabel>Is this a recurring conversation?</FieldLabel>
        <input
          type="checkbox"
          name="multisession"
          id="proposemultisession"
          className="
          cursor-pointer
          rounded-sm
          border-gray-300 p-2
          text-primary
          focus:border-2 focus:border-primary focus:ring-2 focus:ring-primary
        "
          onChange={handleCheckBox}
        />
      </div>
      <Session
        isRecurring={isRecurring}
        handleChange={handleSetSessions}
        deleteSession={handleDelete}
        danger={danger}
        sessions={sessions}
      />
    </div>
  );
};
export default SessionsInput;
