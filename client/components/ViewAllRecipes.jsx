import { Box, Button } from "@mui/material";

export function ViewAllRecipes(){

    function viewAllRedirect() {
    let url = "/All";
    Router.push(url);
    }

    return(
    <Box textAlign="center" paddingTop={3}>
        <Button
            variant="contained"
            color="secondary"
            onClick={() => viewAllRedirect()}
        >
            Browse All
        </Button>
    </Box>
)}