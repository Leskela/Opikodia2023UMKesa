const Label = (prolps) => {

    let labelStyle = {
        fontFamily:"sans-serif",
        fontWeight:"bold",
        margin:0,
        padding:13
    }

    return (
        <p style={labelStyle}
            onClick={prolps.onColorChange}
        >{prolps.color}</p>
    )
}

export default Label;