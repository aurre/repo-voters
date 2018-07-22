import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader'
import Typography from '@material-ui/core/Typography';

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';


export default () => {
    return (
        <div>
            <Card>
                <CardHeader title="Login"></CardHeader>
                <CardContent>


                </CardContent>
                <CardActions>
                    <Button size="small" color="primary">
                        Login
          </Button>
                </CardActions>
            </Card>
        </div>
    )
}