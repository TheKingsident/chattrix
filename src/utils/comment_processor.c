#include <string.h>
#include <stdlib.h>
#include <stdbool.h>

/**
 * contains_keyword - Checks if a keyword exists within a comment string.
 * @comment: The string containing the comment to search.
 * @keyword: The keyword to search for within the comment.
 *
 * Return: true if the keyword is found in the comment, false otherwise.
 */
bool contains_keyword(const char *comment, const char *keyword)
{
	return (strstr(comment, keyword) != NULL);
}
