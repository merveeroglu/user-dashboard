// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";
import * as yup from "yup";
// import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import Col from "react-bootstrap/Col";
import {Row, Button, Form, FormControl, InputGroup } from "react-bootstrap";
import axios from "axios";

const UserModal = ({ isModalOpen, setIsModalOpen, user, setUser }) => {

  const handleClose = () => {
    formik.resetForm()
    setIsModalOpen(false);
  };

  const initialValues = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    university: user?.university || "",
  };
  const validationScheme = yup.object({
    firstName: yup.string().required("Ad alanı zorunludur"),
    lastName: yup.string().required("Soyad alanı zorunludur"),
    email: yup
      .string()
      .email("Geçerli bir e-posta adresi giriniz")
      .required("E-posta alanı zorunludur"),
    phone: yup.string().required("Telefon alanı zorunludur"),
    university: yup.string().required("Telefon alanı zorunludur"),
  });
  const onSubmit = async(values) => {
    console.log("add user", values);
      try {
    const response = await axios.post("https://dummyjson.com/users/add", values);
    console.log("Kullanıcı başarıyla eklendi:", response.data);
    
    handleClose(); 
    setUser(null)

  } catch (error) {
    console.error("Kullanıcı eklenirken hata oluştu:", error);
  } finally {
    setUser(null)
  }
  };
  const formik = useFormik({
    initialValues,
    validationScheme,
    onSubmit,
    enableReinitialize: true, // user değiştiğinde initialValues u tekrar ayarlaması için
  });
  return (
    <div>
      <Modal show={isModalOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{user ? "User Edit" : "Add User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Row className="mb-3">
            <Form.Group as={Col} md="6" className="mt-2" controlId="validationCustom01">
              <Form.Label>First name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="First name"
                {...formik.getFieldProps("firstName")}
                isInvalid={
                  formik.touched.firstName && !!formik.errors.firstName
                }
              />
              <FormControl.Feedback type="invalid">
                {formik.errors.firstName}
              </FormControl.Feedback>
            </Form.Group>            
            <Form.Group as={Col} md="6" className="mt-2" controlId="validationCustom02">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Last name"
                {...formik.getFieldProps("lastName")}
                isInvalid={
                  formik.touched.lastName && !!formik.errors.lastName
                }
              />
              <FormControl.Feedback type="invalid">
                {formik.errors.lastName}
              </FormControl.Feedback>
            </Form.Group>                         
            <Form.Group as={Col} md="12" className="mt-4" controlId="validationCustom03">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="email"
                {...formik.getFieldProps("email")}
                isInvalid={
                  formik.touched.email && !!formik.errors.email
                }
              />
              <FormControl.Feedback type="invalid">
                {formik.errors.email}
              </FormControl.Feedback>
            </Form.Group>            
            <Form.Group as={Col} md="12" className="mt-4" controlId="validationCustom04">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="phone"
                {...formik.getFieldProps("phone")}
                isInvalid={
                  formik.touched.phone && !!formik.errors.phone
                }
              />
              <FormControl.Feedback type="invalid">
                {formik.errors.phone}
              </FormControl.Feedback>
            </Form.Group>            
            <Form.Group as={Col} md="12" className="mt-4" controlId="validationCustom05">
              <Form.Label>University</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="university"
                {...formik.getFieldProps("university")}
                isInvalid={
                  formik.touched.university && !!formik.errors.university
                }
              />
              <FormControl.Feedback type="invalid">
                {formik.errors.university}
              </FormControl.Feedback>
            </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={formik.handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserModal;
