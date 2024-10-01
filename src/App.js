import React, { useState } from "react";

function App() {
  // Состояние для хранения значений полей формы и ошибок
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    fname: "",
    lname: "",
    phone: "",
    email: "",
  });

  // Функция валидации email
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  // Функция валидации имени и фамилии
  const validateName = (name) => {
    const re = /^[A-Za-zА-Яа-яЁё\s-]+$/; // Позволяет буквы, пробелы и дефисы
    return re.test(name) && name.trim().length > 1; // Проверяем, что не пустое
  };

  // Функция валидации номера телефона
  const validatePhone = (phone) => {
    const re = /^\+?[0-9\s()-]{7,}$/; // Простой шаблон для номера телефона
    return re.test(phone); // Проверяем формат
  };

  // Обработчик изменения значений в полях формы
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Удаляем ошибку при изменении поля
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault(); // Предотвращаем стандартное поведение формы

    // Проверка всех полей на ошибки перед отправкой
    const newErrors = {
      fname: !validateName(formData.fname)
        ? "Please enter a valid first name."
        : "",
      lname: !validateName(formData.lname)
        ? "Please enter a valid last name."
        : "",
      phone: !validatePhone(formData.phone)
        ? "Please enter a valid phone number."
        : "",
      email: !validateEmail(formData.email)
        ? "Please enter a valid email address."
        : "",
    };

    // Проверяем наличие ошибок
    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors); // Устанавливаем ошибки в состояние
      return; // Не отправляем форму, если есть ошибки
    }

    // Если все проверки прошли успешно, выводим данные
    alert(
      `First Name: ${formData.fname}\nLast Name: ${formData.lname}\nPhone Number: ${formData.phone}\nEmail: ${formData.email}`
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="fname">First Name:</label>
        <input
          className="form-field"
          type="text"
          id="fname"
          name="fname"
          value={formData.fname}
          onChange={handleChange}
        />
        {errors.fname && <p style={{ color: "red" }}>{errors.fname}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="lname">Last Name:</label>
        <input
          className="form-field"
          type="text"
          id="lname"
          name="lname"
          value={formData.lname}
          onChange={handleChange}
        />
        {errors.lname && <p style={{ color: "red" }}>{errors.lname}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone Number:</label>
        <input
          className="form-field"
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          className="form-field"
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </div>

      <button className="submit" type="submit">
        Submit
      </button>
    </form>
  );
}

export default App;
