import React from "react";
import moment from "moment";

const BoxMessage = ({ message: { to, from, message, createdAt }, name }) => {
    let isCurrentUser = false;
    if (name === from.trim()) {
        return (
            <div className="sm:mx-auto md:mx-10 lg:mx-20 xl:mx-24">
                <div className="clearfix">
                    <div className="bg-green-300 float-right mx-4 my-2 p-2 rounded-lg clearfix">
                        <p className="whitespace-pre-line break-all" style={{ maxWidth: "20rem" }}>
                            {message}
                        </p>
                        <small>{moment(createdAt).format("d/m/Y H:m")}</small>
                    </div>
                </div>
            </div>
        );
    } else if (name === to.trim()) {
        return (
            <div className=" sm:mx-auto md:mx-10 lg:mx-20 xl:mx-24">
                <div className="clearfix">
                    <div className="bg-gray-300 float-left mx-4 my-2 p-2 rounded-lg">
                        <p className="whitespace-pre-line break-all" style={{ maxWidth: "20rem" }}>
                            {message}
                        </p>
                        <small>{moment(createdAt).format("d/m/Y H:m")}</small>
                    </div>
                </div>
            </div>
        );
    }
};

export default BoxMessage;
