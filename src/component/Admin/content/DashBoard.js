import "./DashBoard.scss";
import React, { PureComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ReferenceLine,
    ResponsiveContainer,
} from "recharts";
import { getOverView } from "../../../services/apiServices";
function DashBoard() {
    const [dataOverView, setDataOverView] = useState([]);
    const { t } = useTranslation();
    const data = [
        {
            name: t("dashBoard.title6"),
            quiz: dataOverView?.others?.countQuiz ?? 0,
        },
        {
            name: t("dashBoard.title7"),
            ques: dataOverView?.others?.countQuestions ?? 0,
        },
        {
            name: t("dashBoard.title8"),
            answer: dataOverView?.others?.countAnswers ?? 0,
        },
    ];
    useEffect(() => {
        fetchDataDashBoard();
    }, []);
    const fetchDataDashBoard = async () => {
        let res = await getOverView();
        if (res && res.EC === 0) {
            setDataOverView(res.DT);
        }
    };
    return (
        <div className="wrapper__dash-board">
            <h2>{t("dashBoard.title1")}</h2>
            <div className="dash__board">
                <div className="dash__board-content">
                    <div className="total">
                        <span>{t("dashBoard.title2")}</span>
                        <span>
                            {dataOverView && dataOverView.users && dataOverView.users.total
                                ? dataOverView.users.total
                                : 0}
                        </span>
                    </div>
                    <div className="total">
                        <span>{t("dashBoard.title3")}</span>
                        <span>
                            {dataOverView && dataOverView.others && dataOverView.others.countQuiz
                                ? dataOverView.others.countQuiz
                                : 0}
                        </span>
                    </div>
                    <div className="total">
                        <span>{t("dashBoard.title4")}</span>
                        <span>
                            {dataOverView && dataOverView.others && dataOverView.others.countQuestions
                                ? dataOverView.others.countQuestions
                                : 0}
                        </span>
                    </div>
                    <div className="total">
                        <span>{t("dashBoard.title5")}</span>
                        <span>
                            {dataOverView && dataOverView.others && dataOverView.others.countAnswers
                                ? dataOverView.others.countAnswers
                                : 0}
                        </span>
                    </div>
                </div>
                <div className="content__right">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="quiz" fill="#8884d8" />
                            <Bar dataKey="ques" fill="#0d6efd" />
                            <Bar dataKey="answer" fill="green" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default DashBoard;
