import React from "react";
import { PullToRefresh, InfiniteScroll } from "antd-mobile";
import Loading from "../Loading";

export default function MyPullToRefresh(props) {
  console.log('MyPullToRefresh', props.children)
  return (
    <>
      <PullToRefresh
        onRefresh={props.onRefresh}
        renderText={status => {
          return <Loading status={status} />;
        }}
      >
        {props.children}
        <InfiniteScroll loadMore={props.loadMore} hasMore={props.hasMore} />
      </PullToRefresh>
    </>
  );
}
