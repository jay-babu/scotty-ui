import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const ENDPOINT = new URL('http://localhost:8080/')

const CHAT_ENDPOINT = new URL(`${ENDPOINT.href}scotty/v1/chat`)

function App() {
  const [post, setPost] = useState(<li></li>);
  const [userPrompt, setUserPrompt] = useState('');

  useEffect(() => {
    if (!userPrompt) return
    axios.post(CHAT_ENDPOINT.href, { message: userPrompt }, { headers: { "Content-Type": 'application/json' } }).then(res => {
      setPost((res.data?.messages ?? []).map((value: { message: string }) => <li>{value.message}</li>))
    })
  }, [userPrompt])

  console.log(post);


  return (
    <div className="App">
      <h1>Hello</h1>
      <Formik
        initialValues={{ prompt: '' }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setUserPrompt(values.prompt)

            setSubmitting(false);
          }, 500);
        }}
      >

        {({ isSubmitting }) => (
          <Form>
            <Field type="input" name="prompt" />

            <ErrorMessage name="prompt" component="div" />

            <button type="submit" disabled={isSubmitting}>
              Submit

            </button>
          </Form>
        )}
      </Formik>

      <ul>{post}</ul>

    </div>
  );
}

export default App;
