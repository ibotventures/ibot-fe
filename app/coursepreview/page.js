'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Accordion, AccordionItem, AccordionHeader, AccordionBody, Container, Row, Col, Button, Offcanvas, Spinner, FormGroup, Input, Label } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '@/app/page.module.css';
import { toast } from 'react-toastify';
import Image from "next/image";
import classNames from 'classnames';
import { useRouter, useParams } from "next/navigation";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import Cookies from 'js-cookie';
import { FaStar, FaEdit, FaTrash } from 'react-icons/fa';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const MyComponent = () => {
  const [openAccordion, setOpenAccordion] = useState(""); // For opening accordion sections
  const [openAccordion1, setOpenAccordion1] = useState('');
  const [selectedModule, setSelectedModule] = useState(''); // For displaying content on main side
  const [selectedTask, setSelectedTask] = useState(''); // For displaying task content
  const [sidebarOpen, setSidebarOpen] = useState(false); // To handle sidebar visibility
  const [isLargeScreen, setIsLargeScreen] = useState(false); // For responsive handling
  const [courseData, setCourseData] = useState(''); // State to store course data
  const [loading, setLoading] = useState(true);
  const [overviewDocs, setOverviewDocs] = useState([]); // Store overview document
  const [contentDocs, setContentDocs] = useState([]); // Store content document
  const [activityDocs, setActivityDocs] = useState([]); // Store activity document
  const router = useRouter();
  const [selectedOptions, setSelectedOptions] = useState({}); // Track selected option per question
  const [answerResults, setAnswerResults] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Modal visibility
  const [moduleIdToDelete, setModuleIdToDelete] = useState(''); // Track which module to delete
  const handleOptionChanges = (taskId, option) => {
    setSelectedOptions(prev => ({
      ...prev,
      [taskId]: option
    }));
  };
  useEffect(() => {
    // Set the screen size state correctly on initial render
    setIsLargeScreen(window.innerWidth >= 768);
    const fetchCoursePreview = async () => {
      try {
        const courseIds = sessionStorage.getItem('course');
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/coursepreview/`,
          { courseid: courseIds },
        );
        console.log(courseIds);
        setCourseData(response.data.data);
        setLoading(false);
      } catch (error) {
        toast.error("Something went wrong while loading course data.");
        setLoading(false);
      }
    };
    fetchCoursePreview();
  }, []);
  // Handle screen resizing
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? "" : id);
  };
  const toggleAccordion1 = (id) => {
    setOpenAccordion1(openAccordion1 === id ? "" : id);
  };
  const handleaddques = (id) => {
    sessionStorage.setItem('module', id);
    router.push('/adminpages/assessmentform');
    // router.push(`/assessmentform?id=${id}`);
  };
  const handleModuleClick = (module) => {
    setSelectedModule(module);
    setSelectedTask("intro");
    setOverviewDocs([{ uri: `${process.env.NEXT_PUBLIC_BASE_API_URL}/${module.intro}` }]);
    setContentDocs([{ uri: `${process.env.NEXT_PUBLIC_BASE_API_URL}/${module.content}` }]);
    setActivityDocs([{ uri: `${process.env.NEXT_PUBLIC_BASE_API_URL}/${module.activity}` }]);
  };
  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };
  const handleclick = async () => {
    const courseId = sessionStorage.getItem('course');
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/confirm/`, { courseid: courseId });
    if (res.status == 200 || res.status == 201) {
      if (courseData.isconfirmed) {
        toast.success("removed successfully")
      } else {
        toast.success('confirmed successfully');
      }
      sessionStorage.getItem('course', 0);
      router.push('/courselist');
    } else {
      toast.error('Can not able to confirm, try again');
    }
  }
  const handleanswer = async (moduleId) => {
    const submissionData = {
      moduleId,
      answers: selectedOptions,
    };
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/submitanswers/`, submissionData);

      if (response.status === 200) {
        const results = response.data.data; // assuming data is an array of { taskId: 'correct' or 'wrong' }
        const newResults = {};
        results.forEach((result) => {
          const taskId = Object.keys(result)[0];
          newResults[taskId] = result[taskId];
        });
        setAnswerResults(newResults); // update answer results state
        toast.success('Answers submitted successfully');
      } else {
        toast.error('Answers not submitted, something went wrong');
      }
    } catch (error) {
      console.error('Error submitting answers:', error);
    }
  };

  const handleaddmod = (id) => {
    sessionStorage.setItem('course', id);
    router.push('/adminpages/moduleform');
  }
  const handleedit = (id, type) => {
    sessionStorage.setItem('tasktype', type);
    sessionStorage.setItem('modupdateid', id);
    router.push('/adminpages/edittask');
  }

  const handleassdel = async (modid, quesid) => {
    try {
      console.log(`Attempting to delete question with ID: ${quesid} in module: ${modid}`);

      const response = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/deleteques/${quesid}/`);

      if (response.status === 200) {
        console.log("Successfully deleted question. Updating course data...");

        // Update the courseData state with the deleted question removed
        setCourseData((prevCourseData) => {
          console.log("Prev Course Data:", prevCourseData);

          // Find the module that needs to be updated
          const updatedModules = prevCourseData.modules.map((module) => {
            if (module.id === modid) {
              console.log(`Module found: ${module.id}`);

              // Only filter out the deleted assessment, and keep the others intact
              const updatedAssessments = module.assessments.filter((assessment) => assessment.id !== quesid);

              // Ensure we are only modifying the assessments, not the entire module
              return {
                ...module,
                assessments: updatedAssessments
              };
            }
            return module;
          });

          console.log("Updated Modules:", updatedModules);

          // Return the updated course data with the module assessments filtered
          return {
            ...prevCourseData,
            modules: updatedModules,
          };
        });

        // Update selectedModule if it matches the deleted module
        setSelectedModule((prevSelectedModule) => {
          if (prevSelectedModule && prevSelectedModule.id === modid) {
            return {
              ...prevSelectedModule,
              assessments: prevSelectedModule.assessments.filter((assessment) => assessment.id !== quesid)
            };
          }
          return prevSelectedModule;
        });

        // Update selectedTask if it matches the deleted question
        setSelectedTask((prevSelectedTask) => {
          if (prevSelectedTask && prevSelectedTask.id === quesid) {
            return null; // Reset selected task if it was the deleted question
          }
          return prevSelectedTask;
        });

        toast.success("Question deleted successfully");
      } else {
        toast.error("Unable to delete question");
      }
    } catch (error) {
      console.error("Error while deleting question:", error);
      toast.error("An error occurred while deleting the question");
    }
  };

  // Function to open the delete confirmation modal
  const confirmDelete = (id) => {
    setModuleIdToDelete(id);
    setShowDeleteModal(true);
  };

  // Function to handle deletion of a module
  const handledelete = async () => {
    if (!moduleIdToDelete) return;

    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/deletemodule/${moduleIdToDelete}/`);
      if (response.status === 200) {
        toast.success('Module deleted successfully');
        // Filter out the deleted module from the courseData state
        setCourseData((prevCourseData) => {
          const updatedModules = prevCourseData.modules.filter((module) => module.id !== moduleIdToDelete);
          return { ...prevCourseData, modules: updatedModules };
        });
      } else {
        toast.error("Unable to delete module");
      }
    } catch (error) {
      console.error('Error deleting module:', error);
      toast.error("An error occurred while deleting the module");
    } finally {
      setShowDeleteModal(false); // Close modal after deletion
      setModuleIdToDelete(null);
    }
  };

  const renderContent = () => {
    if (!selectedTask) {
      return (
        <div style={{ margin: "20px" }}>
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_API_URL}${courseData.course_cover_image}`}
            width={200}
            height={200}
            className='img-fluid'
            style={{ width: '100%', height: '600px' }}
            alt="Course Cover"
          />
        </div>

      );
    }

    switch (selectedTask) {
      case 'intro':
        return (
          <div style={{ margin: "20px" }}>
            {/* <h2 style={{ textAlign: "center" }}>Module - {selectedModule.module_name}</h2> */}
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
                style={{ width: "100%", height: "600px", overflow: 'auto', border: '1px solid #ccc' }}

              />

            )}

          </div>
        );
      case 'main':
        return (
          <div style={{ margin: "20px" }}>
            {/* <h2 style={{ textAlign: "center" }}>Module - {selectedModule.module_name}</h2> */}
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
                style={{ width: "100%", height: "600px", overflow: 'auto', border: '1px solid #ccc' }}
              />


            )}

          </div>
        );


      case 'activity':
        return (
          <div style={{ margin: "20px" }}>
            {/* <h2 style={{ textAlign: "center" }}>Module - {selectedModule.module_name}</h2> */}
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
                style={{ width: "100%", height: "600px", overflow: 'auto', border: '1px solid #ccc' }}

              />

            )}
          </div>
        );
      case 'assessment':
        return (
          <div style={{ backgroundColor: "whitesmoke", padding: "20px", margin: "20px" }}>
            <h1 style={{ textAlign: "center" }}>{courseData.course_name}</h1>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h2>{selectedModule.module_name} - Assessment</h2>
              {Cookies.get('username') === 'Administrator' ? (
                <button
                  className='btn btn-primary'
                  onClick={() => handleaddques(selectedModule.id)}
                >
                  Add Questions
                </button>
              ) : null}

            </div>
            <br />
            <form onSubmit={(e) => { e.preventDefault(); handleanswer(selectedModule.id); }}>
              {selectedModule.assessments.map((task, idx) => (
                <div key={task.id}>
                  <h3
                    style={{ border: "1px solid #ccc", padding: "10px" }}
                    className={styles.parafont}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <p>{idx + 1}. {task.question}</p>
                      {Cookies.get('username') === 'Administrator' ? (
                        <FaTrash onClick={() => handleassdel(selectedModule.id, task.id)} className="text-danger cursor-pointer" />
                      ) : null}
                    </div>
                  </h3>
                  <br />
                  {task.options.map((option, optIdx) => (
                    <div key={`${task.id}-option-${optIdx}`}>
                      <label className={styles.parafont}>
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
              <button className="btn btn-primary" type="submit">Submit</button>
            </form>
          </div>
        )
      default:
        return <p>Unknown task type.</p>;
    }
  };
  if (loading) {
    return <p>Loading....</p>;
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
          scrollable

        >
          <h4 className="p-3">{courseData.course_name}</h4>
          {Cookies.get('username') === 'Administrator' ? (
            <button className={classNames("btn btn-primary btn-block", styles.fontp)} style={{ width: "100%", borderRadius: "1.3vw" }} onClick={handleclick}>
              {courseData.isconfirmed == true ? ('remove from display') : ('confirm to display')}
            </button>
          ) : null}
          <br />
          {courseData && courseData.modules && courseData.modules.length > 0 ? (
            <Accordion open={openAccordion} toggle={toggleAccordion}>
              {courseData.modules.map((module, index) => (
                <AccordionItem key={module.id}>
                  <AccordionHeader targetId={`${module.id}`} onClick={() => handleModuleClick(module)}>
                    <div style={{ display: 'flex', justifyContent: "space-between" }}>
                      <div>{module.module_name}</div>
                      {Cookies.get('username') === 'Administrator' ? (
                        <div style={{ paddingLeft: "50px" }}>

                          <FaTrash onClick={() => confirmDelete(module.id)} className="text-danger cursor-pointer" style={{ cursor: 'pointer', marginLeft: '50px' }} />
                        </div>
                      ) : null}
                    </div>

                  </AccordionHeader>
                  <AccordionBody accordionId={`${module.id}`}>
                    <div className={styles.taskboxes}>
                      <div className={styles.taskbox} onClick={() => handleTaskClick("intro")} style={{ display: "flex", justifyContent: "space-between" }}>
                        Overview
                        <FaEdit style={{ color: 'blue', cursor: 'pointer' }} onClick={(e) => {
                          e.stopPropagation();
                          handleedit(module.id, 'overview');
                        }} />
                      </div>
                      <div className={styles.taskbox} onClick={() => handleTaskClick("main")} style={{ display: "flex", justifyContent: "space-between" }}>
                        Main Content
                        <FaEdit style={{ color: 'blue', cursor: 'pointer' }} onClick={(e) => {
                          e.stopPropagation();
                          handleedit(module.id, 'content');
                        }} />
                      </div>
                      <div className={styles.taskbox} onClick={() => handleTaskClick("activity")} style={{ display: "flex", justifyContent: "space-between" }}>
                        Activity
                        <FaEdit style={{ color: 'blue', cursor: 'pointer' }} onClick={(e) => {
                          e.stopPropagation();
                          handleedit(module.id, 'activity');
                        }} />
                      </div>
                      <div className={styles.taskbox} onClick={() => handleTaskClick("assessment")}>
                        Assessment
                      </div>
                    </div>
                  </AccordionBody>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p>No modules found.</p>
          )}
          {Cookies.get('username') === 'Administrator' ? (
            <div>
              <button className='btn btn-primary' onClick={() => handleaddmod(courseData.id)} style={{ width: "100%", borderRadius: "1.3vw" }}>Add Module</button>
            </div>
          ) : null}
        </Offcanvas>

        <Row>
          {isLargeScreen && (
            <Col xs="12" md="3" className="border-end" style={{ backgroundColor: "whitesmoke" }}>
              <div>
                <h4 className="p-3">{courseData.course_name}</h4>
                {Cookies.get('username') === 'Administrator' ? (
                  <button className={classNames("btn btn-primary btn-block", styles.fontp)} style={{ width: "100%", borderRadius: "1.3vw" }} onClick={handleclick}>
                    {courseData.isconfirmed == true ? ('remove from display') : ('confirm to display')}
                  </button>
                ) : (<div></div>)}
              </div>
              <br />
              {courseData && courseData.modules && courseData.modules.length > 0 ? (
                <Accordion open={openAccordion} toggle={toggleAccordion}>
                  {courseData.modules.map((module, index) => (
                    <AccordionItem key={module.id}>
                      <AccordionHeader targetId={`${module.id}`} onClick={() => handleModuleClick(module)}>
                        <div style={{ display: 'flex', justifyContent: "space-between", width: "100%", paddingRight: "20px" }}>
                          <div>{module.module_name}</div>
                          {Cookies.get('username') === 'Administrator' ? (

                            <div>

                              <FaTrash onClick={() => confirmDelete(module.id)} className="text-danger cursor-pointer" style={{ cursor: 'pointer', marginLeft: '20px' }} />
                            </div>
                          ) : null}
                        </div>
                      </AccordionHeader>
                      <AccordionBody accordionId={`${module.id}`}>
                        <div className={styles.taskboxes}>
                          <div className={styles.taskbox} onClick={() => handleTaskClick("intro")} style={{ display: "flex", justifyContent: "space-between" }}>
                            Overview
                            <FaEdit style={{ color: 'blue', cursor: 'pointer' }} onClick={(e) => {
                              e.stopPropagation();
                              handleedit(module.id, 'overview');
                            }} />
                          </div>
                          <div className={styles.taskbox} onClick={() => handleTaskClick("main")} style={{ display: "flex", justifyContent: "space-between" }}>
                            Main Content
                            <FaEdit style={{ color: 'blue', cursor: 'pointer' }} onClick={(e) => {
                              e.stopPropagation();
                              handleedit(module.id, 'content');
                            }} />
                          </div>
                          <div className={styles.taskbox} onClick={() => handleTaskClick("activity")} style={{ display: "flex", justifyContent: "space-between" }}>
                            Activity
                            <FaEdit style={{ color: 'blue', cursor: 'pointer' }} onClick={(e) => {
                              e.stopPropagation();
                              handleedit(module.id, 'activity');
                            }} />
                          </div>
                          <div className={styles.taskbox} onClick={() => handleTaskClick("assessment")}>
                            Assessment
                          </div>
                        </div>
                      </AccordionBody>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <p>No modules found.</p>
              )}
              <br />
              {Cookies.get('username') === 'Administrator' ? (
                <div>
                  <button className='btn btn-primary' onClick={() => handleaddmod(courseData.id)} style={{ width: "100%", borderRadius: "1.3vw" }}>Add Module</button>
                </div>
              ) : null}
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
              </div>
            </div>
          </Col>
        </Row >
        {/* Delete Confirmation Modal */}
        <Modal isOpen={showDeleteModal} toggle={() => setShowDeleteModal(false)}>
          <ModalHeader toggle={() => setShowDeleteModal(false)}>Confirm Deletion</ModalHeader>
          <ModalBody>Are you sure you want to delete this module?</ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={handledelete}>Yes</Button>
            <Button color="secondary" onClick={() => setShowDeleteModal(false)}>No</Button>
          </ModalFooter>
        </Modal>
      </Container >


    </>
  );
};

export default MyComponent;








