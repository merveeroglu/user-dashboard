// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import * as yup from "yup";
// import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import Col from "react-bootstrap/Col";
import { Row, Button, Form, FormControl, InputGroup } from "react-bootstrap";
import axios from "axios";
import ConfirmModal from "./common/ConfirmModal";

const UserModal = ({
  isModalOpen,
  setIsModalOpen,
  user,
  setUser,
  setNewUsers,
}) => {
  const [confirmShow, setConfirmShow] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");

  const handleClose = () => {
    formik.resetForm();
    setIsModalOpen(false);
  };

  const initialValues = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    university: user?.university || "",
  };
  const validationSchema = yup.object({
    firstName: yup.string().required("Ad alanı zorunludur"),
    lastName: yup.string().required("Soyad alanı zorunludur"),
    email: yup
      .string()
      .matches(/^[^\s@]+@[^\s@]*$/, "Geçerli bir e-posta adresi giriniz")
      .required("E-posta alanı zorunludur"),
    phone: yup
      .string()
      .matches(
        /^\+?\d{1,3}[\s-]?\d{3}[\s-]?\d{3}[\s-]?\d{4}$/,
        "Eksik rakam girdiniz"
      )
      .required("Telefon alanı zorunludur"),
    university: yup.string().required("Telefon alanı zorunludur"),
  });
  const onSubmit = async (values) => {
    try {
      if (user) {
        const storedUsers = JSON.parse(localStorage.getItem("newUsers")) || [];

        const updatedUsers = storedUsers.map((u) =>
          u.id === user.id ? { ...u, ...values } : u
        );
        localStorage.setItem("newUsers", JSON.stringify(updatedUsers));
        setNewUsers((prev) =>
          prev.map((u) => (u.id === user.id ? { ...u, ...values } : u))
        );
      } else {
        const response = await axios.post(
          "https://dummyjson.com/users/add",
          values
        );

        const storedUsers = JSON.parse(localStorage.getItem("newUsers")) || [];
        const newUser = {
          ...response.data,
          id: Date.now(),
        };
        localStorage.setItem(
          "newUsers",
          JSON.stringify([...storedUsers, newUser])
        );
        setNewUsers((prev) => [...prev, newUser]);

        setConfirmMessage("Kullanıcı başarıyla eklendi.");
        setConfirmShow(true);
      }

      handleClose();
      setUser(null);
    } catch (error) {
      console.error("Kullanıcı eklenirken hata oluştu:", error);
    } finally {
      setUser(null);
    }
  };

  const handleConfirm = () => {
    setConfirmShow(false);
    handleClose();
    setUser(null);
  };

  const handleCancel = () => {
    setConfirmShow(false);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
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
              <Form.Group
                as={Col}
                md="6"
                className="mt-2"
                controlId="validationCustom01"
              >
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
              <Form.Group
                as={Col}
                md="6"
                className="mt-2"
                controlId="validationCustom02"
              >
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
              <Form.Group
                as={Col}
                md="12"
                className="mt-4"
                controlId="validationCustom03"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="ornek@mail.com"
                  {...formik.getFieldProps("email")}
                  isInvalid={formik.touched.email && !!formik.errors.email}
                />
                <FormControl.Feedback type="invalid">
                  {formik.errors.email}
                </FormControl.Feedback>
              </Form.Group>
              <Form.Group
                as={Col}
                md="12"
                className="mt-4"
                controlId="validationCustom04"
              >
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="0505 ___ __ __"
                  maxLength={11}
                  onKeyDown={(e) => {
                    const allowedKeys = [
                      "Backspace",
                      "Delete",
                      "ArrowLeft",
                      "ArrowRight",
                      "Tab",
                    ];
                    if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  {...formik.getFieldProps("phone")}
                  isInvalid={formik.touched.phone && !!formik.errors.phone}
                />
                <FormControl.Feedback type="invalid">
                  {formik.errors.phone}
                </FormControl.Feedback>
              </Form.Group>
              <Form.Group
                as={Col}
                md="12"
                className="mt-4"
                controlId="validationCustom05"
              >
                <Form.Label>University</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="University"
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

      <ConfirmModal
        show={confirmShow}
        title="Bilgi"
        message={confirmMessage}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        autoClose={true}
      />
    </div>
  );
};

export default UserModal;
