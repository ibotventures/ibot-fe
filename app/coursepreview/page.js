'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Accordion, AccordionItem, AccordionHeader, AccordionBody, Container, Row, Col, Button, Offcanvas, Spinner, FormGroup, Input, Label } from 'reactstrap';
import styles from '@/app/page.module.css';
import { toast } from 'react-toastify';
import Image from "next/image";
import classNames from 'classnames';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import Cookies from 'js-cookie';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import styler from '@/app/coursepreview/course.module.css';

const MyComponent = () => {
  const [yourreview, setyourreview] = useState([]);
  const [rating, setRating] = useState(0); // State to store selected rating
  const [comment, setComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(""); // For opening accordion sections
  const [openAccordion1, setOpenAccordion1] = useState('');
  const [selectedModule, setSelectedModule] = useState(''); // For displaying content on main side
  const [selectedTask, setSelectedTask] = useState(''); // For displaying task content
  const [sidebarOpen, setSidebarOpen] = useState(false); // To handle sidebar visibility
  const [isLargeScreen, setIsLargeScreen] = useState(false); // For responsive handling
  const [courseData, setCourseData] = useState(''); // State to store course data
  const [certifyques, setcertifyques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [change, setchange] = useState(false);
  const [overviewDocs, setOverviewDocs] = useState([]); // Store overview document
  const [contentDocs, setContentDocs] = useState([]); // Store content document
  const [activityDocs, setActivityDocs] = useState([]); // Store activity document
  const [selectedOptions, setSelectedOptions] = useState({}); // Track selected option per question
  const [answerResults, setAnswerResults] = useState({});
  const [userallow, setuserallow] = useState('');
  const [reviews, setReviews] = useState([]);
  const userCook = Cookies.get('userid');
  const handleOptionChanges = (taskId, option) => {
    setSelectedOptions(prev => ({
      ...prev,
      [taskId]: option
    }));
  };

  const handledeletereview = async (id) => {
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/delcoursereview/${id}/`);
      if (res.status === 200) {
        const filteredReviews = reviews.filter(review => review.id !== id);
        setReviews(filteredReviews);
        const yourReview = yourreview.filter(review => review.id !== id);
        setyourreview(yourReview);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  }

  const fetchReviews = async () => {
    try {
      const courseIds = sessionStorage.getItem('course');
      const username = Cookies.get('username');
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/reviews/`, {
        params: { id: courseIds }
      }
      );

      if (response.status === 200) {
        setReviews(response.data.data);
        const yourReview = response.data.data.filter(review => review.username === username);
        setyourreview(yourReview);
      }
      setLoading(false);
    } catch (error) {
      toast.error("Something went wrong while loading reviews");
      setLoading(false);
    }
  };

  const handlereview = async () => {
    if (!comment) {
      toast.error('comment is empty');
      return;
    }
    const courseIds = sessionStorage.getItem('course');
    const username = Cookies.get('username');
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/reviews/`,
      { 'user': userCook, 'course': courseIds, 'review': comment, 'rating': rating },
    );
    if (response.status == 200) {
      setReviews(response.data.data);
      const yourReview = response.data.data.filter(review => review.username === username);
      setyourreview(yourReview);
      setComment("");
      setRating(0);
    }

  }

  useEffect(() => {
    // Set the screen size state correctly on initial render
    setIsLargeScreen(window.innerWidth >= 768);
    const fetchCoursePreview = async () => {
      try {
        const courseIds = sessionStorage.getItem('course');
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/coursepreview/`,
          { courseid: courseIds },
        );
        setCourseData(response.data.data);
        setLoading(false);
      } catch (error) {
        toast.error("Something went wrong while loading course data.");
        setLoading(false);
      }
    };
    const track = async () => {
      try {
        const userid = Cookies.get('userid');
        const courseIds = sessionStorage.getItem('course');
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/tasktracking/`, {
          params: {
            userid: userid,
            courseid: courseIds,
          },
        });
        if (response.status == 200) {
          const trackmod = sessionStorage.getItem('moduletrack');
          setSelectedModule(response.data.data);
          setSelectedTask(response.data.data.task);
          if (trackmod) {
            setOpenAccordion(openAccordion === trackmod ? "" : trackmod);
          }
          setOpenAccordion(openAccordion === response.data.data.id ? "" : response.data.data.id);
          setOverviewDocs([{ uri: `${process.env.NEXT_PUBLIC_BASE_API_URL}${response.data.data.intro}` }]);
          setContentDocs([{ uri: `${process.env.NEXT_PUBLIC_BASE_API_URL}${response.data.data.content}` }]);
          setActivityDocs([{ uri: `${process.env.NEXT_PUBLIC_BASE_API_URL}${response.data.data.activity}` }]);
        } else if (response.status == 201) {
          setSelectedTask(response.data.data);
        }
      } catch (error) {
        // toast.error("Something went wrong while loading.");
      }
    };

    fetchCoursePreview()
      .then(() => track())
      .then(() => fetchReviews())
      .catch(error => console.error("Error in useEffect chain:", error));

  }, []);


  const certifyquess = async () => {
    try {
      const courseIds = sessionStorage.getItem('course');
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/certifications/`, {
        params: {
          course_id: courseIds,
        },
      });
      if (response.status === 200) {
        setcertifyques(response.data.data[0].questions); // Update state with fetched questions
      }
    } catch (error) {
      // console.error("Error fetching certification questions:", error);
      toast.error("Failed to load certification questions.");
    }
  };

  const certifyquesuser = async () => {
    try {
      const lastmod = courseData.modules[courseData.modules.length - 1];
      const moduleid = lastmod.id;
      const userid = Cookies.get('userid');
      const { data, status } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/canviewmodule/`, {
        params: { userid, moduleid }
      });
      if (status == 200) {
        certifyquess();
        setuserallow(userid);
      }
    } catch (e) {
      setuserallow('');
    }
  }
  useEffect(() => {
    certifyquesuser();
  }, [courseData, change]);

  // Handle screen resizing
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleRetest = () => {
    setSelectedOptions({}); // Reset selected options
    setIsSubmitted(false); // Enable submit button
  };

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? "" : id);
  };
  const toggleAccordion1 = (id) => {
    setOpenAccordion1(openAccordion1 === id ? "" : id);
  };

  const handleModuleClick = async (module, index) => {
    const courseIds = sessionStorage.getItem('course');
    const userid = Cookies.get('userid');
    if (index == 0 || Cookies.get('username') == 'Administrator') {
      setSelectedModule(module);
      setSelectedTask("overview");
      const { data, status } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/tasktracking/`, {
        userid, courseIds, task: "overview", moduleid: module.id
      });
      setOverviewDocs([{ uri: `${process.env.NEXT_PUBLIC_BASE_API_URL}${module.intro}` }]);
      setContentDocs([{ uri: `${process.env.NEXT_PUBLIC_BASE_API_URL}${module.content}` }]);
      setActivityDocs([{ uri: `${process.env.NEXT_PUBLIC_BASE_API_URL}${module.activity}` }]);
    } else {
      try {
        const previousModule = courseData.modules[index - 1];
        const moduleid = previousModule.id;
        const { data, status } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/canviewmodule/`, {
          params: { userid, moduleid }
        });
        if (status == 200) {
          setSelectedModule(module);
          setSelectedTask("overview");
          const { data, status } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/tasktracking/`, {
            userid, courseIds, task: "overview", moduleid: module.id
          });
          setOverviewDocs([{ uri: `${process.env.NEXT_PUBLIC_BASE_API_URL}${module.intro}` }]);
          setContentDocs([{ uri: `${process.env.NEXT_PUBLIC_BASE_API_URL}${module.content}` }]);
          setActivityDocs([{ uri: `${process.env.NEXT_PUBLIC_BASE_API_URL}${module.activity}` }]);
        }
      } catch {
        toast.error('You have to score more than 65% in the previous assessment to access the next module');
        setOpenAccordion("");
      }
    }
  };

  const handlecertify = async (task) => {
    const userid = Cookies.get('userid');
    const courseIds = sessionStorage.getItem('course');
    if (!isLargeScreen) {
      setSidebarOpen(!sidebarOpen);
    }

    const { data, status } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/tasktracking/`, {
      userid, courseIds, task: "certifyques", moduleid: null
    });
    if (status == 200) {
      if (task == 'certifyques') {
        if (isSubmitted) {
          handleRetest();
        }
      }
    }
    setSelectedTask(task);
  }

  const handleTaskClick = async (task, module) => {
    const courseIds = sessionStorage.getItem('course');
    const userid = Cookies.get('userid');
    const { data, status } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/tasktracking/`, {
      userid, courseIds, task: task, moduleid: module
    });
    if (!isLargeScreen) {
      setSidebarOpen(!sidebarOpen);
    }
    if (task != 'overview' && task != 'main') {
      if (task == 'activity') {
        if (data.data.main == 1) {
          setSelectedTask(task);
        } else {
          toast.error('Not yet completed the previous task');
        }
      }
      if (task == 'assessment') {
        if (data.data.activity == 1) {
          setSelectedTask(task);
        } else {
          toast.error('Not yet completed the previous task');
        }
      }
    } else {
      setSelectedTask(task);
    }

    if (status == 200) {
      if (task == 'assessment') {
        if (isSubmitted) {
          handleRetest();
        }
      }
    }

  };

  const handleanswer = async (moduleId) => {
    const userid = Cookies.get('userid');
    const courseId = sessionStorage.getItem('course');
    const submissionData = {
      moduleId,
      answers: selectedOptions,
      userid,
      courseId
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/app/submitanswers/`,
        submissionData
      );

      if (response.status === 200) {
        const results = response.data.data; // assuming data is an array of results
        const newResults = {};

        results.forEach((result) => {
          const keys = Object.keys(result);

          // Check if the key is a percentage
          if (keys.includes('percentage')) {
            const obtainedPercentage = result['percentage'];

            if (obtainedPercentage < 65) {
              setchange(false);
              toast.error(
                `You need to score more than 65% to pass this assessment. Your percentage: ${obtainedPercentage.toFixed(2)}%`
              );
            } else {
              if (moduleId == courseData.modules[courseData.modules.length - 1].id) {
                setchange(true);
              }
              toast.success(
                `Congratulations! You passed the assessment with ${obtainedPercentage.toFixed(2)}%. You can now access the next module.`
              );
            }
          }
        });

        setAnswerResults(newResults); // update the state with the new results
        setIsSubmitted(true);
      } else {
        toast.error('Answers not submitted, something went wrong');
      }
    } catch (error) {
      // console.error('Error submitting answers:', error);
      toast.error('An error occurred while submitting your answers.');
    }
  };


  const handlecertifyanswer = async () => {
    const userid = Cookies.get('userid');
    const courseid = courseData.id;
    const submissionData = {
      courseid,
      answers: selectedOptions,
      userid,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/app/submitcertificationanswers/`,
        submissionData
      );

      if (response.status === 200) {
        const results = response.data.data; // assuming data is an array of results
        const newResults = {};

        results.forEach((result) => {
          const keys = Object.keys(result);

          // Check if the key is a percentage
          if (keys.includes('percentage')) {
            const obtainedPercentage = result['percentage'];
            if (obtainedPercentage < 65) {
              toast.error(
                `You need to score more than 65% to pass this Course. Your percentage: ${obtainedPercentage.toFixed(2)}%`
              );
            } else {
              toast.success(
                `Congratulations! You passed the test with ${obtainedPercentage.toFixed(2)}%. If you haven't filled your profile details please fill it to get  your digital certificate with your actual
                 Name`
              );
            }
          }
        });
        setAnswerResults(newResults); // update the state with the new results
        setIsSubmitted(true);
      } else {
        toast.error('Answers not submitted, something went wrong');
      }
    } catch (error) {
      // console.error('Error submitting answers:', error);
      toast.error('An error occurred while submitting your answers.');
    }
  }

  const renderContent = () => {
    if (!selectedTask) {
      return (
        <div style={{ margin: "20px" }}>
          {/* <video
            src={`${process.env.NEXT_PUBLIC_BASE_API_URL}${courseData.video}`}
            width="100%"
            height="600px"
            controls
            className="img-fluid"
            style={{ border: '1px solid #ccc' }}
          /> */}
          <iframe width="560" height="315" src={courseData.video} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      );
    }

    switch (selectedTask) {
      case 'video':
        return (
          <div style={{ margin: "20px" }}>
            {/* <video
              src={`${process.env.NEXT_PUBLIC_BASE_API_URL}${courseData.video}`}
              width="100%"
              height="600px"
              controls
              className="img-fluid"
              style={{ border: '1px solid #ccc' }}
            /> */}
            <iframe width="560" height="315" src={courseData.video} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen style={{
              'width': "100%",
              'height': "600px"
            }}></iframe>
          </div>
        );
      case 'overview':
        return (
          <div style={{ margin: "20px" }}>
            {selectedModule.type_intro == '.pptx' || selectedModule.type_intro == '.ppt' ? (
              <iframe
                src={selectedModule.intro}
                width="100%"
                height="600px"
                allowFullScreen
              />
            ) : (
              <DocViewer
                documents={overviewDocs}
                initialActiveDocument={overviewDocs[1]}
                pluginRenderers={DocViewerRenderers}
                style={{ width: "100%", maxHeight: "600px", overflow: 'auto', border: '1px solid #ccc' }}
              />
            )}
          </div>
        );
      case 'main':
        return (
          <div style={{ margin: "20px" }}>
            {selectedModule.type_content == '.pptx' || selectedModule.type_content == '.ppt' ? (
              <iframe
                src={selectedModule.content}
                width="100%"
                height="600px"
                allowFullScreen
              />
            ) : (
              <DocViewer
                documents={contentDocs}
                initialActiveDocument={contentDocs[1]}
                pluginRenderers={DocViewerRenderers}
                style={{ width: "100%", maxHeight: "600px", overflow: 'auto', border: '1px solid #ccc' }}
              />
            )}

          </div>
        );

      case 'activity':
        return (
          <div style={{ margin: "20px" }}>
            {selectedModule.type_activity == '.pptx' || selectedModule.type_activity == '.ppt' ? (
              <iframe
                src={selectedModule.activity}
                width="100%"
                height="600px"
                allowFullScreen
              />
            ) : (
              <DocViewer
                documents={activityDocs}
                initialActiveDocument={activityDocs[1]}
                pluginRenderers={DocViewerRenderers}
                style={{ width: "100%", maxHeight: "600px", overflow: 'auto', border: '1px solid #ccc' }}
              />
            )}
          </div>
        );

      case 'assessment':
        return (
          <div style={{ backgroundColor: "whitesmoke", padding: "20px", margin: "20px" }}>
            <h1 style={{ textAlign: "center" }}>{courseData.course_name}</h1>
            <div className={styler.assess}>
              <h2>{selectedModule.module_name} - Assessment</h2>
              <p>marks: {selectedModule.assessments.length}</p>
            </div>
            <br />
            <form>
              {selectedModule.assessments.map((task, idx) => (
                <div key={task.id}>
                  <h3
                    style={{ border: "1px solid #ccc", padding: "10px" }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <p>{idx + 1}. {task.question}</p>
                    </div>
                  </h3>
                  <br />
                  {task.options.map((option, optIdx) => (
                    <div key={`${task.id}-option-${optIdx}`}>
                      <label>
                        <input
                          style={{ width: '15px', height: "15px", margin: "10px" }}
                          type="radio"
                          value={option}
                          checked={selectedOptions[task.id] === option}
                          onChange={() => handleOptionChanges(task.id, option)}
                        />
                        <span
                          style={{
                            color:
                              answerResults[task.id] === 'correct' && selectedOptions[task.id] === option
                                ? 'green'
                                : answerResults[task.id] === 'wrong' && selectedOptions[task.id] === option
                                  ? 'red'
                                  : 'inherit',
                          }}
                        >
                          {option}
                        </span>
                      </label>
                      <br />
                    </div>
                  ))}
                  <br /><br />
                </div>
              ))}
              {!isSubmitted ? (
                <button className="btn btn-primary" type="button" onClick={(e) => { e.preventDefault(); handleanswer(selectedModule.id); }}>
                  Submit
                </button>
              ) : (
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={handleRetest}
                >
                  Take Retest
                </button>
              )}
            </form>
          </div>
        )

      case 'certifyques':
        return (
          <>
            <div style={{ backgroundColor: "whitesmoke", padding: "20px", margin: "20px" }}>
              <h1 style={{ textAlign: "center" }}>{courseData.course_name}</h1>
              <div className={styler.assess}>
                <h2>Certification Assessment</h2>
                <p>marks: {certifyques.length}</p>
              </div>
              <br />

              <form>
                {certifyques.map((task, idx) => (
                  <div key={task.id}>
                    <h3
                      style={{ border: "1px solid #ccc", padding: "10px" }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <p>{idx + 1}. {task.question}</p>
                      </div>
                    </h3>
                    <br />
                    {[task.option1, task.option2, task.option3, task.option4].map((option, optIdx) => (
                      <div key={`${task.id}-option-${optIdx}`}>
                        <label>
                          {/* Unique name for each question */}
                          <input
                            style={{ width: '15px', height: "15px", margin: "10px" }}
                            type="radio"
                            name={`question-${task.id}`} // Unique name per task
                            value={option}
                            checked={selectedOptions[task.id] === option}
                            onChange={() => handleOptionChanges(task.id, option)}
                          />
                          <span
                            style={{
                              color:
                                answerResults[task.id] === 'correct' && selectedOptions[task.id] === option
                                  ? 'green'
                                  : answerResults[task.id] === 'wrong' && selectedOptions[task.id] === option
                                    ? 'red'
                                    : 'inherit',
                            }}
                          >
                            {option}
                          </span>
                        </label>
                      </div>
                    ))}
                    <br /><br />
                  </div>
                ))}
                {!isSubmitted ? (
                  <button className="btn btn-primary" type="button" onClick={(e) => { e.preventDefault(); handlecertifyanswer(); }}>
                    Submit
                  </button>
                ) : (
                  <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={handleRetest}
                  >
                    Take Retest
                  </button>
                )}
              </form>

            </div>
          </>
        )
      default:
        return <p>Unknown task type.</p>;
    }
  };

  if (loading) {
    return (

      <div className="d-flex align-items-center flex-column justify-content-center" style={{ width: '100vw', height: '90vh' }}>
        <h4 style={{ textAlign: 'center' }}>"Almost there! Your data is on its way..."</h4>
        <Spinner>
          Loading...
        </Spinner>
      </div>

    );
  }

  return (
    <>
      <Container fluid>
        {!isLargeScreen && (
          <Button
            className="btn-toggle-sidebar"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle Sidebar"
          >
            &#9776;
          </Button>
        )}

        <Offcanvas
          isOpen={sidebarOpen}
          toggle={() => setSidebarOpen(!sidebarOpen)}
          className="offcanvas-start"
          style={{ overflowY: 'auto' }}
        >
          <h4 className="p-3">{courseData.course_name}</h4>
          <br />
          {courseData && courseData.modules && courseData.modules.length > 0 ? (
            <>
              <Accordion open={openAccordion} toggle={toggleAccordion}>
                <AccordionItem>
                  <AccordionHeader targetId={`${courseData.id}`}>
                    <div style={{ display: 'flex', justifyContent: "space-between" }}>
                      <div>Course Introduction</div>
                    </div>
                  </AccordionHeader>
                  <AccordionBody accordionId={`${courseData.id}`}>
                    <div className={styles.taskboxes}>
                      <div className={styles.taskbox} onClick={() => { setSelectedTask('video'); setSidebarOpen(!sidebarOpen) }} style={{ display: "flex", justifyContent: "space-between" }}>
                        A small introduction on this course
                      </div>
                    </div>
                  </AccordionBody>
                </AccordionItem>
              </Accordion >
              <Accordion open={openAccordion} toggle={toggleAccordion}>
                {courseData.modules.map((module, index) => (
                  <AccordionItem key={module.id}>
                    <AccordionHeader targetId={`${module.id}`} onClick={() => handleModuleClick(module, index)}>
                      <div style={{ display: 'flex', justifyContent: "space-between" }}>
                        <div>{module.module_name}</div>
                      </div>

                    </AccordionHeader>
                    <AccordionBody accordionId={`${module.id}`}>
                      <div className={styles.taskboxes}>
                        <div className={styles.taskbox} onClick={() => handleTaskClick("overview", module.id)} style={{ display: "flex", justifyContent: "space-between" }}>
                          Overview
                        </div>
                        <div className={styles.taskbox} onClick={() => handleTaskClick("main", module.id)} style={{ display: "flex", justifyContent: "space-between" }}>
                          Main Content
                        </div>
                        <div className={styles.taskbox} onClick={() => handleTaskClick("activity", module.id)} style={{ display: "flex", justifyContent: "space-between" }}>
                          Activity
                        </div>
                        <div className={styles.taskbox} onClick={() => handleTaskClick("assessment", module.id)}>
                          Assessment
                        </div>
                      </div>
                    </AccordionBody>
                  </AccordionItem>
                ))}
              </Accordion>
            </>
          ) : (
            <p>No modules found.</p>
          )}
          {Cookies.get('userid') === userallow ? (
            <Accordion open={openAccordion} toggle={toggleAccordion}>
              <AccordionItem>
                <AccordionHeader targetId="certify">
                  Certification Test
                </AccordionHeader>
                <AccordionBody accordionId="certify">
                  <div className={styles.taskbox} onClick={() => handlecertify("certifyques")}>
                    Certificate Assessment
                  </div>
                </AccordionBody>
              </AccordionItem>
            </Accordion>
          ) : null}
          <br />
        </Offcanvas>

        <Row>
          {isLargeScreen && (
            <Col xs="12" md="3" className="border-end" style={{ backgroundColor: "whitesmoke" }}>
              <div>
                <h4 className="p-3">{courseData.course_name}</h4>
              </div>
              <br />
              {courseData && courseData.modules && courseData.modules.length > 0 ? (
                <>
                  <Accordion open={openAccordion} toggle={toggleAccordion}>
                    <AccordionItem>
                      <AccordionHeader targetId={`${courseData.id}`}>
                        <div style={{ display: 'flex', justifyContent: "space-between" }}>
                          <div>Course Introduction</div>
                        </div>
                      </AccordionHeader>
                      <AccordionBody accordionId={`${courseData.id}`}>
                        <div className={styles.taskboxes}>
                          <div className={styles.taskbox} onClick={() => setSelectedTask('video')} style={{ display: "flex", justifyContent: "space-between" }}>
                            A small introduction on this course
                          </div>
                        </div>
                      </AccordionBody>
                    </AccordionItem>
                  </Accordion >
                  <Accordion open={openAccordion} toggle={toggleAccordion}>
                    {courseData.modules.map((module, index) => (
                      <AccordionItem key={module.id}>
                        <AccordionHeader targetId={`${module.id}`} onClick={() => handleModuleClick(module, index)}>
                          <div style={{ display: 'flex', justifyContent: "space-between", width: "100%", paddingRight: "20px" }}>
                            <div>{module.module_name}</div>
                          </div>
                        </AccordionHeader>
                        <AccordionBody accordionId={`${module.id}`}>
                          <div className={styles.taskboxes}>
                            <div className={styles.taskbox} onClick={() => handleTaskClick("overview", module.id)} style={{ display: "flex", justifyContent: "space-between" }}>
                              Overview
                            </div>
                            <div className={styles.taskbox} onClick={() => handleTaskClick("main", module.id)} style={{ display: "flex", justifyContent: "space-between" }}>
                              Main Content
                            </div>
                            <div className={styles.taskbox} onClick={() => handleTaskClick("activity", module.id)} style={{ display: "flex", justifyContent: "space-between" }}>
                              Activity
                            </div>
                            <div className={styles.taskbox} onClick={() => handleTaskClick("assessment", module.id)}>
                              Assessment
                            </div>
                          </div>
                        </AccordionBody>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </>
              ) : (
                <p>No modules found.</p>
              )}
              {Cookies.get('userid') === userallow ? (
                <Accordion open={openAccordion} toggle={toggleAccordion}>
                  <AccordionItem>
                    <AccordionHeader targetId="certify">
                      Certification Test
                    </AccordionHeader>
                    <AccordionBody accordionId="certify">
                      <div className={styles.taskbox} onClick={() => handlecertify("certifyques")}>
                        Certificate Assessment
                      </div>
                    </AccordionBody>
                  </AccordionItem>
                </Accordion>
              ) : null}
              <br />
            </Col>
          )}

          <Col xs="12" md={isLargeScreen ? "9" : "12"}>
            <div className={styles.contentSection}>
              {renderContent()}
              <div style={{ margin: "20px" }}>
                <h1 style={{ textAlign: "center" }}>{courseData.course_name}</h1><br />
                <div style={{ marginTop: "10px" }}>
                  <h3>Course Description</h3>
                  <p>{courseData.course_description}</p>
                </div>
                <br />
                <h3>Course Content</h3>
                {courseData && courseData.modules && courseData.modules.length > 0 ? (
                  <Accordion open={openAccordion1} toggle={toggleAccordion1}>
                    {courseData.modules.map((module, index) => (
                      <AccordionItem key={module.id}>
                        <AccordionHeader targetId={`${module.id}`}>
                          {module.module_name}
                        </AccordionHeader>
                        <AccordionBody accordionId={`${module.id}`}>
                          <div className={styles.taskboxes}>
                            {module.module_description}
                          </div>
                        </AccordionBody>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <p>No modules found.</p>
                )}
                <br />
                <h3>Review</h3>
                <form>
                  <fieldset className="starability-slot">
                    <input
                      type="checkbox"
                      id="no-rate"
                      className="input-no-rate"
                      name="review[rating]"
                      value="1"
                      checked
                      onChange={(e) => setRating(e.target.value)}
                      aria-label="No rating."
                    />

                    <input
                      type="checkbox"
                      id="first-rate1"
                      name="review[rating]"
                      value="1"
                      checked={rating >= 1}
                      onChange={(e) => setRating(e.target.value)}
                    />
                    <label htmlFor="first-rate1" title="Terrible">1 star</label>

                    <input
                      type="checkbox"
                      id="first-rate2"
                      name="review[rating]"
                      value="2"
                      checked={rating >= 2}
                      onChange={(e) => setRating(e.target.value)}
                    />
                    <label htmlFor="first-rate2" title="Not good">2 stars</label>

                    <input
                      type="checkbox"
                      id="first-rate3"
                      name="review[rating]"
                      value="3"
                      checked={rating >= 3}
                      onChange={(e) => setRating(e.target.value)}
                    />
                    <label htmlFor="first-rate3" title="Average">3 stars</label>

                    <input
                      type="checkbox"
                      id="first-rate4"
                      name="review[rating]"
                      value="4"
                      checked={rating >= 4}
                      onChange={(e) => setRating(e.target.value)}
                    />
                    <label htmlFor="first-rate4" title="Very good">4 stars</label>

                    <input
                      type="checkbox"
                      id="first-rate5"
                      name="review[rating]"
                      value="5"
                      checked={rating >= 5}
                      onChange={(e) => setRating(e.target.value)}
                    />
                    <label htmlFor="first-rate5" title="Amazing">5 stars</label>
                  </fieldset>
                  <div style={{ fontWeight: "bold", fontSize: "large" }}>Comments</div>
                  <br />
                  <textarea
                    id="reviews"
                    name="review[comment]"
                    required
                    className={classNames('form-control', styler.comment)}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                  <br />
                  <button
                    type='button'
                    onClick={handlereview}
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                </form>
                <br />
                <div className="container mt-4">
                  <h2 className="mb-4">Your reviews</h2>
                  <Row>
                    {yourreview.length !== 0 ? (
                      yourreview.map((review, index) => (
                        <Col key={index} md="6" lg="4" className="mb-4">
                          <Card className="shadow-sm">
                            <CardBody>
                              <div className="d-flex align-items-center mb-3">
                                {/* Star Rating */}
                                {Array(5)
                                  .fill()
                                  .map((_, i) => (
                                    <span
                                      key={i}
                                      className={`me-1 ${i < review.rating ? 'text-warning' : 'text-muted'
                                        }`}
                                    >
                                      ★
                                    </span>
                                  ))}
                              </div>
                              <CardTitle tag="h5">{review.review}</CardTitle>
                              <CardText className="text-muted">
                                <strong>createdBy:</strong> {review.username}
                              </CardText>
                              <CardText>
                                <small className="text-muted">
                                  createdAt: {new Date(review.createdAt).toUTCString()}
                                </small>
                              </CardText>
                              <Button color="danger" outline size="sm" onClick={() => { handledeletereview(review.id) }}>
                                🗑️ Delete
                              </Button>
                            </CardBody>
                          </Card>
                        </Col>
                      ))
                    ) : (
                      // <p>No reviews available</p>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white', width: '100%', padding: '20px' }}>
                        <Image
                          src='/empty.png'
                          className="img-fluid"
                          alt="Profile Image"
                          width={90}
                          height={90}
                          style={{
                            borderRadius: "50%",
                            objectFit: "cover",
                            width: "150px",
                            height: "150px",
                          }}
                        />
                        <p>We are waiting for your stars and reviews</p>
                      </div>
                    )}
                  </Row>
                </div>
                <div className="container mt-4">
                  <h2 className="mb-4">Ratings and Reviews</h2>
                  <Row>
                    {reviews.length !== 0 ? (
                      reviews.map((review, index) => (
                        <Col key={index} md="6" lg="4" className="mb-4">
                          <Card className="shadow-sm">
                            <CardBody>
                              <div className="d-flex align-items-center mb-3">
                                {/* Star Rating */}
                                {Array(5)
                                  .fill()
                                  .map((_, i) => (
                                    <span
                                      key={i}
                                      className={`me-1 ${i < review.rating ? 'text-warning' : 'text-muted'
                                        }`}
                                    >
                                      ★
                                    </span>
                                  ))}
                              </div>
                              <CardTitle tag="h5">{review.review}</CardTitle>
                              <CardText className="text-muted">
                                <strong>createdBy:</strong> {review.username}
                              </CardText>
                              <CardText>
                                <small className="text-muted">
                                  createdAt: {new Date(review.createdAt).toUTCString()}
                                </small>
                              </CardText>
                            </CardBody>
                          </Card>
                        </Col>
                      ))
                    ) : (
              
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white', width: '100%', padding: '20px' }}>
                        <Image
                          src='/empty.png'
                          className="img-fluid"
                          alt="Profile Image"
                          width={90}
                          height={90}
                          style={{
                            borderRadius: "50%",
                            objectFit: "cover",
                            width: "150px",
                            height: "150px",
                          }}
                        />
                        <p>We are waiting for your stars and reviews</p>
                      </div>
                      
                    )}
                  </Row>
                </div>
              </div>
            </div>
          </Col >
        </Row >
      </Container >
    </>
  );
};

export default MyComponent;








