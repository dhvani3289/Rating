import './Rating.css'
import { FaStar } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { GrPowerReset } from "react-icons/gr";
import { MdOutlineUndo } from "react-icons/md";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Rating() {
    let [rate, setRate] = useState(0);  //Rating
    let [hover, setHover] = useState(0);
    let [close, setClose] = useState(true);
    let [review, setReview] = useState({});   //Feedback
    let [data, setData] = useState([]);

    let handleReview = ((e) => {
        setReview({ ...review, [e.target.name]: e.target.value })
    })

    let resetRate = () => {
        setRate(0);
        setReview({ review: "" });
    }

    useEffect(() => {
        let get = JSON.parse(localStorage.getItem('Feedback'));
        get ? setData(get) : setData([]);
    }, setData);
    
    let submitData = ((e) => {
        e.preventDefault();
        if (rate && review) {
            let newList = {
                ...review,
                ['rating']: rate,
            }
            let set = [...data, newList]
            setData(set);
            localStorage.setItem('Feedback', JSON.stringify(set))
            setRate(0)
            setReview({ review: "" });
        } else {
            toast.error("Please provide a rating and feedback.")
        }
    })

    return (
        <>
            <h1 style={{ textAlign: "center", marginTop: "50px", marginBottom: "20px" }}>Star Ratings in React</h1>
            <form onSubmit={submitData} style={{ textAlign: "center" }}>
                {close ?
                    <span>
                        {
                            [1, 2, 3, 4, 5].map((value, index) => {
                                index = index + 1;
                                return (
                                    <FaStar className="star" name="rating"
                                        onClick={() => setRate(index)}
                                        onMouseEnter={() => setHover(index)}
                                        onMouseLeave={() => setHover(0)}
                                        style={(rate || hover) >= index ? { color: "yellow" } : { color: "grey" }} />
                                )
                            })
                        }
                        <div className="close-wrap">
                            <GrClose className='close' onClick={() => setClose(false)} />
                        </div>
                    </span>
                    :
                    <a onClick={() => setClose(true)}><MdOutlineUndo /> Undo
                    </a>
                }
                <div className='feedback' >
                    <textarea placeholder="What's Your Feedback" rows={7} cols={40} name="review" onChange={handleReview} value={review.review ? review.review : ""}>
                    </textarea>
                </div>

                <button type="submit" className='submit'>SUBMIT</button>
                <br />
                <button type="reset" className='reset' onClick={() => resetRate()}>
                    <GrPowerReset /> RESET
                </button>
            </form>
            <div className='container'>
                {data.map((v, i) => {
                        return (
                            <>
                                {<div className="box">
                                    {v.rating == 1 ?
                                        <FaStar style={{ color: "yellow" }} />
                                        :
                                        v.rating == 2 ?
                                            <span>
                                                <FaStar style={{ color: "yellow" }} />
                                                <FaStar style={{ color: "yellow" }} />
                                            </span>
                                            :
                                            v.rating == 3 ?
                                                <span>
                                                    <FaStar style={{ color: "yellow" }} />
                                                    <FaStar style={{ color: "yellow" }} />
                                                    <FaStar style={{ color: "yellow" }} />
                                                </span>
                                                :
                                                v.rating == 4 ?
                                                    <span>
                                                        <FaStar style={{ color: "yellow" }} />
                                                        <FaStar style={{ color: "yellow" }} />
                                                        <FaStar style={{ color: "yellow" }} />
                                                        <FaStar style={{ color: "yellow" }} />
                                                    </span>
                                                    :
                                                    v.rating == 5 ?
                                                        <span>
                                                            <FaStar style={{ color: "yellow" }} />
                                                            <FaStar style={{ color: "yellow" }} />
                                                            <FaStar style={{ color: "yellow" }} />
                                                            <FaStar style={{ color: "yellow" }} />
                                                            <FaStar style={{ color: "yellow" }} />
                                                        </span>
                                                        :
                                                        ""
                                    }
                                    <br />
                                    {v.review}
                                </div>
                                }
                            </>
                        )
                    })
                }
            </div>
            <ToastContainer />
        </>
    )
}

export default Rating;