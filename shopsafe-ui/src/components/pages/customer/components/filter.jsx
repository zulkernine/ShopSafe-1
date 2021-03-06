import React, { Component } from "react";
import { Box, Divider, GridListTile } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Slider from "@material-ui/core/Slider";


const useStyles = (theme) => ({
    formControl: {
        margin: theme.spacing(1),
        width: "100%",
    },
    chips: {
        display: "flex",
        flexWrap: "wrap",
    },
    chip: {
        margin: 2,
    },
});


class FilterCard extends Component {
    state = {
        filter: {
            openClose: { showAll: true, isOpen: false },
            items: [],
            slotTypes: { Morning: true, Afternoon: true, Evening: true },
            customerRatings: { "4": false, "3": false },
            distance:3,
        },
    };

    formData = {
        itemList: ["gas", "gasf", "gsaf", "gafdsag", "sgasdf"],
        slotType: ["Morning", "Afternoon", "Evening"],
        customerRating:["4","3"],

    };

    handleCheck = (event) => {
        let filter = { ...this.state.filter };
        filter.openClose[event.target.name] = event.target.checked;
        this.setState({ filter });
        console.log(event.target.checked, this.state.filter);
        this.props.updateFilter(this.state.filter);
    };


    handleSelect = ({ target: { name, value } }) => {
        let filter = { ...this.state.filter };
        filter[name] = value;
        this.setState({ filter });
        this.props.updateFilter(filter);
    };

    handleSlot = event => {
        let filter = { ...this.state.filter };
        filter.slotTypes[event.target.name] = event.target.checked;
        this.setState({ filter });
        this.props.updateFilter(this.state.filter);
    }
    
    handleRating = event => {
        let filter = { ...this.state.filter };
        filter.customerRatings[event.target.name] = event.target.checked;
        this.setState({ filter });
        this.props.updateFilter(this.state.filter);
    }

    handleChange = (event, distance) => {
        let filter = { ...this.state.filter };
        filter.distance = distance;
        this.setState({ filter });
        this.props.updateFilter(filter);
    };

    render() {
        const {
            openClose,
            distance,
            slotTypes,
            customerRatings,
        } = this.state.filter;
        const { handleCheck,  handleSlot, handleRating } = this;
        const { items, slotType, customerRating } = this.formData;
        const { classes, theme } = this.props;
        return (
            <Box
                boxShadow={5}
                style={{
                    backgroundColor: "white",
                    width: "100%",
                    marginTop: 5,
                }}
                borderRadius={5}
            >
                <Grid
                    item
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start"
                    spacing={2}
                    style={{
                        width: "100%",
                        margin: "auto",
                    }}
                >
                    <Grid item style={{ width: "100%" }}>
                        <Box
                            boxShadow={0}
                            style={{
                                backgroundColor: "white",
                                width: "100%",
                                marginTop: 23,
                            }}
                            p={3}
                            borderRadius={5}
                        >
                            <Typography variant="body1">
                                Choose Your Radius(in Km)..
                            </Typography>
                            <Slider
                                value={distance}
                                aria-labelledby="discrete-slider-always"
                                step={0.05}
                                onChange={this.handleChange}
                                min={1}
                                max={5}
                                marks={[
                                    { value: 1, label: "1 km" },
                                    { value: 2 },
                                    { value: 3 },
                                    { value: 4 },
                                    { value: 5, label: "5 km" },
                                ]}
                                valueLabelDisplay="on"
                            />
                        </Box>
                    </Grid>
                    <Grid
                        item
                        container
                        direction="row"
                        justify="flex-start"
                        xs={12}
                    >
                        <Typography variant="h5">
                            <b>Filters</b>
                        </Typography>
                    </Grid>
                    <Box p={1} style={{ width: "100%", paddingLeft: 15 }}>
                        <Grid item container xs={12}>
                            <Grid
                                item
                                container
                                xs={12}
                                md={12}
                                direction="column"
                                justify="center"
                            >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={openClose.showAll}
                                            onChange={handleCheck}
                                            name="showAll"
                                        />
                                    }
                                    label="Show All"
                                />
                                <Typography variant="body2">
                                    Check this box to show closed shops too
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box p={1} style={{ width: "90%", paddingLeft: 15 }}>
                        <Typography variant="h6">Items Available</Typography>
                        <MultipleSelect
                            selectedItems={this.state.filter.items}
                            handleChange={this.handleSelect}
                            classes={classes}
                            name="items"
                            label="Type of Items Available"
                            theme={theme}
                            items={this.props.itemList}
                        />
                    </Box>
                    <Box p={1} style={{ width: "90%", paddingLeft: 15 }}>
                        <Typography variant="h6">Slot Type</Typography>
                        <Grid item container direction="column">
                            {slotType.map((label) => (
                                <Grid item>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={slotTypes[label]}
                                                onChange={handleSlot}
                                                name={label}
                                            />
                                        }
                                        label={label}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                    <Box p={1} style={{ width: "90%", paddingLeft: 15 }}>
                        <Typography variant="h6">Customer Rating</Typography>
                        <Grid item container direction="column">
                            {customerRating.map((label) => (
                                <Grid item>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={customerRatings[label]}
                                                onChange={handleRating}
                                                name={label}
                                            />
                                        }
                                        label={`${label} ★ & above`}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Grid>
            </Box>
        );
    }
}

export default withStyles(useStyles, { withTheme: true })(FilterCard);


class MultipleSelect extends Component {
    state = {
        items: this.props.items,
    };

    getStyles = (item, selectedItems, theme) => {
        return {
            fontWeight:
                selectedItems.indexOf(item) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    };

    MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 224,
                width: 250,
            },
        },
    };

    render() {
        const {
            selectedItems,
            handleChange,
            classes,
            theme,
            name,
            label,
        } = this.props;

        return (
            <FormControl className={classes.formControl} variant="filled">
                <InputLabel id="demo-mutiple-chip-label">{label}</InputLabel>
                <Select
                    labelId="demo-mutiple-chip-label"
                    id="demo-mutiple-chip"
                    multiple
                    name={name}
                    value={selectedItems}
                    onChange={handleChange}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={(selected) => (
                        <div className={classes.chips}>
                            {selected.map((value) => (
                                <Chip
                                    key={value}
                                    label={value}
                                    color="primary"
                                    className={classes.chip}
                                />
                            ))}
                        </div>
                    )}
                    MenuProps={this.MenuProps}
                >
                    {this.props.items.map((item, i) => (
                        <MenuItem
                            key={item}
                            value={item}
                            style={this.getStyles(item, selectedItems, theme)}
                        >
                            {item}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    }
}