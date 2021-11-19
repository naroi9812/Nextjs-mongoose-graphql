import React from "react";
import useSWR from "swr";
import { request, gql } from "graphql-request";

import AuthContext from "../store/auth-context";

const AllComment = (props) => {
  const fetcher = (query) =>
    request("http://localhost:3000/api/graphql", query);
  const query = gql`
    query {
      getComments {
        _id
        creator {
          email
        }
        body
        updatedAt
      }
    }
  `;
  const { data, error } = useSWR(query, fetcher, { refreshInterval: 1000 });
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div className="comment-list">
      <h3>All comments</h3>
      {!error && (
        <ul>
          {data.getComments.map((c) => (
            <li>
              <div>
                {c.creator.email}-{c.body}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllComment;
