import React, { useState, useRef } from "react";
import axios from "axios";
import "./ShortnerForm.css";

const ShortnerForm = () => {
  const [longUrl, setLongUrl] = useState("");
  const [finalUrl, setFinalUrl] = useState(null);

  const urlLink = useRef(null);

  const copyLink = () => {
    console.log(urlLink.current.childNodes[0].data);

    const elem = document.createElement("textarea");
    document.body.appendChild(elem);
    elem.value = urlLink.current.childNodes[0].data;
    elem.select();
    document.execCommand("copy");
    document.body.removeChild(elem);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const srtUrl = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/url/shorten`,
        JSON.stringify({
          longUrl: longUrl,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setFinalUrl(srtUrl);
    } catch (error) {
      console.log(error);
    }

    console.log(longUrl);
    console.log(finalUrl);
  };
  return (
    <div className="container">
      <form onSubmit={submitHandler} className="shortner-form">
        <input
          type="text"
          value={longUrl}
          onChange={(event) => setLongUrl(event.target.value)}
          placeholder="Pase your link"
        />
        <button type="submit">Submit</button>
      </form>
      {finalUrl ? (
        <div>
          <div className="short-url">
            <a ref={urlLink} href={finalUrl.data.shortUrl}>
              {finalUrl.data.shortUrl}
            </a>
            <button onClick={copyLink}>Copy Url</button>
          </div>
          <table>
            <tr>
              <th>Long URl</th>
              <th>Short Url</th>
              <th>Created at</th>
            </tr>
            <tr>
              <td>{finalUrl.data.longUrl}</td>
              <td>{finalUrl.data.shortUrl}</td>
              <td>{new Date(finalUrl.data.date).toLocaleString()}</td>
            </tr>
          </table>
        </div>
      ) : null}
    </div>
  );
};

export default ShortnerForm;
