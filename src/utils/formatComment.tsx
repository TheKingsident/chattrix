import React from 'react';

/**
 * Function to format comment text by decoding HTML entities and handling line breaks.
 * 
 * @param text - The input text that may contain HTML entities and `<br>` tags.
 * @returns A React fragment containing the decoded text split by line breaks,
 *          with each line wrapped in a `<br />` element for proper rendering.
 */
const formatCommentText = (text: string) => {
    // Create a temporary DOM element to decode HTML entities in the input text.
    const tempElement = document.createElement('div');
    tempElement.innerHTML = text;

    // Retrieve the decoded text from the temporary element.
    const decodedText = tempElement.textContent || tempElement.innerText || '';

    // Split the decoded text by '<br>' tags and map each line into a React fragment.
    return decodedText.split('<br>').map((line, index) => (
        <React.Fragment key={index}>
            {line}
            <br /> {/* Adds a line break after each line */}
        </React.Fragment>
    ));
};

export default formatCommentText;
