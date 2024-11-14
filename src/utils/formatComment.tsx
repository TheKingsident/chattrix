import React from 'react';

const formatCommentText = (text: string) => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = text;
    const decodedText = tempElement.textContent || tempElement.innerText || '';

    // Split the text by line breaks and wrap with <br /> elements
    return decodedText.split('<br>').map((line, index) => (
        <React.Fragment key={index}>
            {line}
            <br />
        </React.Fragment>
    ));
};

export default formatCommentText;