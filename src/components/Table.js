import React, { useState, useEffect } from "react";
// import MaterialTable from "material-table";
// import { addClickCount } from "../api/index";
// import { Link } from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import axios from "axios";

const initialFormValues = {
  url: "",
  comment: "",
  tag: "",
};

const DataTable = () => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [links, setLinks] = useState([]);
  const [tags, setTags] = useState([]);

  const handleChanges = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const postLink = (e) => {
    axios
      .post("http://localhost:5000/api/createlink", formValues)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteLink = (id) => {
    console.log(id);

    axios
      .delete(`http://localhost:5000/api/links/${id}`)
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/links")
      .then((res) => {
        console.log(res.data.allLinks);
        setLinks(res.data.allLinks);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("http://localhost:5000/api/linkswithtags")
      .then((res) => {
        console.log(res.data.link);
        setTags(res.data.link);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!links) return <h4>Loading...</h4>;

  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell>Link ID</TableCell>
          <TableCell align="right">URL</TableCell>
          <TableCell align="right">Date Posted</TableCell>
          <TableCell align="right">Comment</TableCell>
          <TableCell align="right">Click Count</TableCell>
          <TableCell align="right">Tag</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {links.map((link) => (
          <TableRow key={link.id}>
            <TableCell component="th" scope="row">
              {link.id}
            </TableCell>
            <TableCell align="right">
              <a href={link.url}>{link.url}</a>
            </TableCell>
            <TableCell align="right">{link.date}</TableCell>
            <TableCell align="right">{link.comment}</TableCell>
            <TableCell align="right">{link.clickcount}</TableCell>
            <TableCell align="right">{link.tag}</TableCell>
            {/* {tags.map((tag) => {
              return link.id === tag.linkid ? (
                <TableCell align="right">{tag.tagname}</TableCell>
              ) : null;
            })} */}
            <button
              onClick={() => {
                deleteLink(link.id);
              }}
            >
              Delete
            </button>
          </TableRow>
        ))}
      </TableBody>
      <div className="link-form">
        <h3>Add New Link</h3>
        <form onSubmit={postLink}>
          <input
            type="text"
            name="url"
            placeholder="URL"
            value={formValues.url}
            onChange={handleChanges}
          />
          <input
            type="text"
            name="comment"
            placeholder="Comment"
            value={formValues.comment}
            onChange={handleChanges}
          />
          <input
            type="text"
            name="tag"
            placeholder="Tag"
            value={formValues.tag}
            onChange={handleChanges}
          />
          <button>Submit</button>
        </form>
      </div>
    </>
  );
};

export default DataTable;
