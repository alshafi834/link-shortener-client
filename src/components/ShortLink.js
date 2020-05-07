import React from "react";
import "./ShortLink.css";

const ShortLink = ({ finalUrl, urlLink, copyLink, loading, isCopied }) => {
  return (
    <div>
      {loading ? <h3 className="loading">Creating short URL</h3> : null}
      {finalUrl ? (
        <div>
          <div className="short-url">
            <a
              ref={urlLink}
              rel="noopener noreferrer"
              target="_blank"
              href={finalUrl.data.shortUrl}
            >
              {finalUrl.data.shortUrl}
            </a>
            <button onClick={copyLink}>
              {" "}
              {isCopied ? "Copied" : "Copu Url"}
            </button>
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

export default ShortLink;
