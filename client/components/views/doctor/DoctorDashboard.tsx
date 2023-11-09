import { useState } from "react";
import styles from "@styles/components/views/patient/patientDashboard.module.scss";
import { DashboardTopNav } from "@/components/reusable";
import { useTime } from "@/hooks";
import { useSession } from "next-auth/react";
import Calendar from "react-calendar";
import { Appointment } from "@/types";
import { parseTimeString } from "@/utils";

type event_type = "appointment";

interface eventC<T> {
  title: string;
  date: Date;
  time: string;
  location: string;
  type: event_type;
  data: T;
}

export const DoctorDashboard = (): JSX.Element => {
  const { getDayGreeting } = useTime();
  const session = useSession();
  const [events, setEvents] = useState<eventC<Appointment>[]>([]);

  function handleEventClick(ev: event_type, appnt_?: Appointment) {}

  return (
    <div className={styles.patientDashboard}>
      <div className={styles.pd_content}>
        <div
          className={`${styles.pd_content_header} ${styles.pd_content_header_doc}`}
        >
          {/* <div className={styles.pd_content_header_title}>
                        <h1>My Dashboard</h1>
                    </div> */}
          <DashboardTopNav />
          <div className={styles.pd_greeting_banner}>
            <h2>
              {getDayGreeting("Good")}, <span>{session.data?.user.name}</span>
            </h2>
          </div>
        </div>
        <div className={styles.pd_content_body}>
          <div className={styles.pd_content_body_strip}>
            <div className={`${styles.pd_content_body_calendar_wrapper}`}>
              <div className={styles.pd_content_body_card_title}>
                <h3>My Calendar</h3>
              </div>
              <div className={styles.pd_content_body_calendar_content}>
                <div className={styles.pd_content_body_calendar}>
                  <Calendar />
                </div>
                <div className={styles.pd_content_body_calendar_events}>
                  <div className={styles.pd_content_body_calendar_events_title}>
                    <h3>Events</h3>
                  </div>
                  <div className={styles.pd_content_body_calendar_events_list}>
                    <ul>
                      {events.length > 0 ? (
                        events.map((event, index) => {
                          return (
                            <li
                              key={index}
                              onClick={() => {
                                handleEventClick("appointment", event.data);
                              }}
                            >
                              <div
                                className={
                                  styles.pd_content_body_calendar_events_list_item
                                }
                              >
                                <div
                                  className={
                                    styles.pd_content_body_calendar_events_list_item_title
                                  }
                                >
                                  <h4>{event.title}</h4>
                                </div>
                                <div
                                  className={
                                    styles.pd_content_body_calendar_events_list_item_date
                                  }
                                >
                                  <h4>
                                    {new Date(event.date).toLocaleDateString()}
                                  </h4>
                                </div>
                                <div
                                  className={
                                    styles.pd_content_body_calendar_events_list_item_time
                                  }
                                >
                                  <h4>{parseTimeString(event.time)}</h4>
                                </div>
                                <div
                                  className={
                                    styles.pd_content_body_calendar_events_list_item_location
                                  }
                                >
                                  <h4>{event.location}</h4>
                                </div>
                              </div>
                            </li>
                          );
                        })
                      ) : (
                        <li key={0} data-elm-type={"null-events"}>
                          <h4>No events scheduled</h4>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className={styles.pd_content_body_strip}>
                        <div className={styles.pd_content_body_card}>
                            <div className={styles.pd_content_body_card_title}>
                                <h3>My Appointments</h3>
                            </div>
                        </div>
                        <div className={styles.pd_content_body_card}>
                            <div className={styles.pd_content_body_card_title}>
                                <h3>My Doctors</h3>
                            </div>
                        </div>
                    </div> */}
        </div>
      </div>
    </div>
  );
};
