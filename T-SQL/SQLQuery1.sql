SET STATISTICS TIME ON;
DECLARE 

    @EmployeeID INT = 710253,       
    @MaxAge INT = 40,               
    @ExcludeSubdivision1 INT = 100055,  
    @ExcludeSubdivision2 INT = 100059, 
	@StartTime DATETIME = SYSDATETIME();

WITH RecursiveSubdivisions AS (
    SELECT 
        id AS sub_id,
        name AS sub_name,
        parent_id,
        1 AS sub_level
    FROM subdivisions
    WHERE id = (SELECT subdivision_id FROM collaborators WHERE id = @EmployeeID)
    UNION ALL
    SELECT 
        s.id AS sub_id,
        s.name AS sub_name,
        s.parent_id,
        rs.sub_level + 1 AS sub_level
    FROM subdivisions AS s
    JOIN RecursiveSubdivisions AS rs ON s.parent_id = rs.sub_id
)
SELECT 
    c.id,
    c.name,
    rs.sub_name,
    rs.sub_id,
    rs.sub_level,
    (SELECT COUNT(*) FROM collaborators WHERE subdivision_id = rs.sub_id) AS colls_count
FROM RecursiveSubdivisions AS rs
JOIN collaborators AS c ON rs.sub_id = c.subdivision_id
WHERE 
    c.age < @MaxAge AND 
    LEN(c.name) > 11 AND 
    c.subdivision_id NOT IN (@ExcludeSubdivision1, @ExcludeSubdivision2)
ORDER BY rs.sub_level ASC;


DECLARE @EndTime DATETIME = SYSDATETIME();

SELECT 
    @StartTime AS StartTime,
    @EndTime AS EndTime,
    DATEDIFF(ms, @StartTime, @EndTime) AS DurationInMilliseconds;

SET STATISTICS TIME OFF;