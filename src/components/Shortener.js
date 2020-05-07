import React, { useState, useRef } from "react";
import axios from "axios";
import "./Shortener.css";
import Header from "./Header";
import ShortLink from "./ShortLink";

const Shortener = () => {
  const [longUrl, setLongUrl] = useState("");
  const [finalUrl, setFinalUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const urlLink = useRef(null);

  const copyLink = () => {
    console.log(urlLink.current.childNodes[0].data);

    const elem = document.createElement("textarea");
    document.body.appendChild(elem);
    elem.value = urlLink.current.childNodes[0].data;
    elem.select();
    document.execCommand("copy");
    document.body.removeChild(elem);
    setIsCopied(true);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
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
      setLoading(false);
    } catch (error) {
      console.log(error);
    }

    //console.log(longUrl);
    //console.log(finalUrl);
  };
  return (
    <div className="container">
      <Header />
      <form onSubmit={submitHandler} className="shortner-form">
        <input
          type="text"
          value={longUrl}
          onChange={(event) => {
            setLongUrl(event.target.value);
            setFinalUrl(null);
            setIsCopied(false);
          }}
          placeholder="Pase your link"
        />
        <button type="submit">Submit</button>
      </form>
      <ShortLink
        finalUrl={finalUrl}
        urlLink={urlLink}
        copyLink={copyLink}
        loading={loading}
        isCopied={isCopied}
      />
    </div>
  );
};

export default Shortener;
