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
import { FaStar } from 'react-icons/fa';

const MyComponent = () => {
  const [openAccordion, setOpenAccordion] = useState(""); // For opening accordion sections
  const [openAccordion1, setOpenAccordion1] = useState('');
  const [selectedModule, setSelectedModule] = useState(null); // For displaying content on main side
  const [selectedTask, setSelectedTask] = useState(null); // For displaying task content
  const [sidebarOpen, setSidebarOpen] = useState(false); // To handle sidebar visibility
  const [isLargeScreen, setIsLargeScreen] = useState(false); // For responsive handling
  const [courseData, setCourseData] = useState(null); // State to store course data
  const [loading, setLoading] = useState(true);
  const [overviewDocs, setOverviewDocs] = useState([]); // Store overview document
  const [contentDocs, setContentDocs] = useState([]); // Store content document
  const [activityDocs, setActivityDocs] = useState([]); // Store activity document
  const router = useRouter();
  const [SelectedOption, setSelectedOption] = useState('');
  const [SelectedOption1, setSelectedOption1] = useState('');
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  }
  const handleOptionChange1 = (event) => {
    setSelectedOption1(event.target.value);
  }
  useEffect(() => {
    // Set the screen size state correctly on initial render
    setIsLargeScreen(window.innerWidth >= 768);

    const fetchCoursePreview = async () => {
      try {
        const courseIds = sessionStorage.getItem('course');

        const response = await axios.post('http://127.0.0.1:8000/app/coursepreview/',
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

  const handleModuleClick = (module) => {
    setSelectedModule(module);
    setSelectedTask("intro");
    setOverviewDocs([{ uri: `http://127.0.0.1:8000/${module.intro}` }]);
    setContentDocs([{ uri: `http://127.0.0.1:8000/${module.content}` }]);
    setActivityDocs([{ uri: `http://127.0.0.1:8000/${module.activity}` }]);


  };



  const handleTaskClick = (task) => {
    setSelectedTask(task);

  };

  const handleclick = async () => {
    const courseId = sessionStorage.getItem('course');
    const res = await axios.post('http://127.0.0.1:8000/app/confirm/', { courseid: courseId });
    if (res.status == 200 || res.status == 201) {
      toast.success('confirmed successfully');
      sessionStorage.getItem('course', 0);
      router.push('/courselist');
    } else {
      toast.error('Can not able to confirm, try again');
    }

  }

  const renderContent = () => {

    if (!selectedTask) {
      return (
        <div style={{ margin: "20px" }}>
          <Image
            src={`http://127.0.0.1:8000${courseData.course_cover_image}`}
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
              //   <iframe
              //   src={`https://view.officeapps.live.com/op/embed.aspx?src=${selectedModule.activity}`}
              //   width="100%"
              //   height="600px"
              //   allowFullScreen
              // />
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
            <h2>{selectedModule.module_name} - Assessment</h2>
            <form>
              {selectedModule.assessments.map((task, idx) => (
                <div key={task.id}>
                  <h3 style={{ border: "1px solid #ccc", padding: "10px" }} className={styles.parafont}>
                    {idx + 1}. {task.question}
                  </h3>
                  <br />
                  {task.options.map((option, optIdx) => (
                    <div key={`${task.id}-option-${optIdx}`}>
                      <label className={styles.parafont}>
                        <input
                          style={{ width: '15px', height: "15px", margin: "10px" }}
                          type='radio'
                          value={option}
                          checked={SelectedOption === option}
                          onChange={handleOptionChange}
                        />
                        {option}
                      </label>
                      <br />
                    </div>
                  ))}
                  <br /><br />
                </div>
              ))}
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
        {!courseData.isconfirmed && Cookies.get('username') === 'Administrator' ? (
          <button className={classNames("btn btn-primary btn-block", styles.fontp)} style={{ width: "100%", borderRadius: "1.3vw" }} onClick={handleclick}>
            confirm to display
          </button>
        ) : (<div></div>)}

        {courseData && courseData.modules && courseData.modules.length > 0 ? (
          <Accordion open={openAccordion} toggle={toggleAccordion}>
            {courseData.modules.map((module, index) => (
              <AccordionItem key={module.id}>
                <AccordionHeader targetId={`${module.id}`} onClick={() => handleModuleClick(module)}>
                  {module.module_name}
                </AccordionHeader>
                <AccordionBody accordionId={`${module.id}`}>
                  <div className={styles.taskboxes}>
                    <div className={styles.taskbox} onClick={() => handleTaskClick("intro")}>
                      Overview
                    </div>
                    <div className={styles.taskbox} onClick={() => handleTaskClick("main")}>
                      Main Content
                    </div>
                    <div className={styles.taskbox} onClick={() => handleTaskClick("activity")}>
                      Activity
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
      </Offcanvas>

      <Row>
        {isLargeScreen && (
          <Col xs="12" md="3" className="border-end" style={{ backgroundColor: "whitesmoke" }}>
            <div>
              <h4 className="p-3">{courseData.course_name}</h4>
              {!courseData.isconfirmed && Cookies.get('username') === 'Administrator' ? (
                <button className={classNames("btn btn-primary btn-block", styles.fontp)} style={{ width: "100%", borderRadius: "1.3vw" }} onClick={handleclick}>
                  confirm to display
                </button>
              ) : (<div></div>)}
            </div>

            {courseData && courseData.modules && courseData.modules.length > 0 ? (
              <Accordion open={openAccordion} toggle={toggleAccordion}>
                {courseData.modules.map((module, index) => (
                  <AccordionItem key={module.id}>
                    <AccordionHeader targetId={`${module.id}`} onClick={() => handleModuleClick(module)}>
                      {module.module_name}
                    </AccordionHeader>
                    <AccordionBody accordionId={`${module.id}`}>
                      <div className={styles.taskboxes}>
                        <div className={styles.taskbox} onClick={() => handleTaskClick("intro")}>
                          Overview
                        </div>
                        <div className={styles.taskbox} onClick={() => handleTaskClick("main")}>
                          Main Content
                        </div>
                        <div className={styles.taskbox} onClick={() => handleTaskClick("activity")}>
                          Activity
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
    </Container >
  );
};

export default MyComponent;



