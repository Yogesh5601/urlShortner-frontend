import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";

const InputUrl = (short) => {
  const [shortUrl, setUrlshortUrl] = useState();
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [longUrl, setUrl] = useState({
    longUrl: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUrl((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  // short the url
  const submit = (event) => {
    axios
      .post("http://localhost:4000/", longUrl)
      .then((res) => {
        setLoading(true);
        console.log(res.data.shortUrl);
        setUrlshortUrl(res.data.shortUrl);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
    event.preventDefault();
    setUrl({
      longUrl: "",
    });
  };

  // redirect to url
  const handleRedirect = () => {
    window.open(shortUrl);
  };

  // copy the url
  const handleCopy = () => {
    alert("copied");
    // setUrlshortUrl("");
  };

  return (
    <>
      {!loading && (
        <div className="p-2 h-[80vh] bg-[#ddd6fe] bg-[url('https://www.transparenttextures.com/patterns/black-mamba.png')] flex flex-col justify-center items-center">
          <div className="inputUrl w-[300px] flex flex-col mb-5">
            <h1 className=" flex justify-center text-[3rem] text-[black] font-mono font-[900]">
              URL
              <span className="ml-2 text-[#5b21b6]">Shortner</span>
            </h1>
            <div className="inputs  flex justify-center">
              <input
                type="text"
                className="p-3 font-mono outline-none"
                name="longUrl"
                value={longUrl.longUrl}
                onChange={handleChange}
                placeholder="Paste a link to shorten it"
              />
              <button
                className="p-3 font-[500] font-mono bg-[#5b21b6] outline-none"
                onClick={submit}
              >
                SHORTEN
              </button>
            </div>
          </div>

          {shortUrl && (
            <div className="linkResult w-[300px] flex flex-col justify-center gap-3">
              <div className="shortUrl  p-3 font-mono font-[500] flex justify-center items-center  bg-white">
                {shortUrl}
              </div>
              <div className="buttons flex gap-3">
                <button
                  className="p-3 w-full font-mono font-[500] outline-none bg-[#5b21b6]"
                  onClick={handleRedirect}
                >
                  Redirect url
                </button>
                <CopyToClipboard text={shortUrl} onCopy={() => setCopied(true)}>
                  <button
                    className="p-3 w-full font-mono font-[500] outline-none bg-[#5b21b6]"
                    onClick={handleCopy}
                  >
                    Copy url
                  </button>
                </CopyToClipboard>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default InputUrl;
