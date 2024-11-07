#include <string.h>
#include <stdlib.h>
#include <stdbool.h>
#include <ctype.h>
#include <stdio.h>

/**
* str_to_lower - Converts a string to lowercase.
* @str: The input string.
*
* Return: A newly allocated string that is the lowercase version of @str.
*         The caller is responsible for freeing this memory.
*         Returns NULL if memory allocation fails or if @str is NULL.
*/
char *str_to_lower(const char *str)
{
	if (!str)
		return (NULL);

	char *lower_str = malloc(strlen(str) + 1);

	if (!lower_str)
	{
		return (NULL);
	}

	for (int i = 0; str[i]; i++)

		lower_str[i] = tolower((unsigned char)str[i]);

	lower_str[strlen(str)] = '\0';

	return (lower_str);
}

/**
* contains_keyword - Checks if a keyword exists within a comment string.
* @comment: The string containing the comment to search.
* @keyword: The keyword to search for within the comment.
*
* Return: true if the keyword is found in the comment, false otherwise.
*         Returns false if either @comment or @keyword is NULL.
*/
bool contains_keyword(const char *comment, const char *keyword)
{
	if (!comment || !keyword)
	{
		fprintf(stderr, "Error: Null string argument passed to contains_keyword\n");
		return (false);
	}

	char *lower_comment = str_to_lower(comment);

	if (!lower_comment)
	{
		return (false);
	}

	char *lower_keyword = str_to_lower(keyword);

	if (!lower_keyword)
	{
		free(lower_comment);
		return (false);
	}

	bool result = (strstr(lower_comment, lower_keyword) != NULL);

	free(lower_comment);
	free(lower_keyword);

	return (result);
}
