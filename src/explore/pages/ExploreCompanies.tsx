// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPublicCompanies, fetchPublicCompaniesBySearch } from "../services/CompanyExploreService.ts";
import { Company } from "../model/PublicCompany.ts";
import PublicCompanyCard from "../components/PublicCompanyCard.tsx";
import {
    Divider,
    Input,
    Pagination,
    Modal,
    Button,
    ModalHeader,
    ModalBody,
    useDisclosure,
    ModalContent
} from "@nextui-org/react";

function ExploreCompanies() {
    const [search, setSearch] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const limit = 10;

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const { status, error, data: companies } = useQuery({
        queryKey: ["companies", searchQuery, selectedIndustry, selectedLocation, page],
        queryFn: () =>
            searchQuery
                ? fetchPublicCompaniesBySearch(searchQuery)
                : fetchPublicCompanies(),
    });

    const industries = ["IT", "Finance", "Healthcare", "Retail"];
    const locations = ["USA", "Canada", "UK", "Germany", "Peru"];

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleSearchEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setSearchQuery(search);
            setPage(1);
        }
    };

    const handleIndustryChange = (industry: string) => {
        setSelectedIndustry(selectedIndustry === industry ? null : industry);
        setPage(1);
    };

    const handleLocationChange = (location: string) => {
        setSelectedLocation(selectedLocation === location ? null : location);
        setPage(1);
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    if (status === "loading") {
        return <i className="pi pi-spin pi-spinner text-2xl" />;
    }

    if (status === "error") {
        return <div>Error: {error.message}</div>;
    }

    const filteredCompanies = companies?.filter((company: Company) => {
        return (
            (!selectedIndustry || company.industry === selectedIndustry) &&
            (!selectedLocation || company.country === selectedLocation)
        );
    });

    return (
        <div className="flex p-4 gap-4">
            {/* Filter modal for small screens */}
            <Modal
                closeButton
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                scrollBehavior={"outside"}
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader>
                                <h2 className="font-semibold text-lg text-secondary">Filters</h2>
                            </ModalHeader>
                            <ModalBody>
                                <div className="py-4">
                                    <h3 className="font-bold">Industry</h3>
                                    {industries.map((industry) => (
                                        <div key={industry} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedIndustry === industry}
                                                onChange={() => handleIndustryChange(industry)}
                                                className="mr-2"
                                            />
                                            <label>{industry}</label>
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <h3 className="font-bold">Location</h3>
                                    {locations.map((location) => (
                                        <div key={location} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedLocation === location}
                                                onChange={() => handleLocationChange(location)}
                                                className="mr-2"
                                            />
                                            <label>{location}</label>
                                        </div>
                                    ))}
                                </div>
                            </ModalBody>
                        </>
                    )
                    }
                </ModalContent>
            </Modal>

            {/* Sidebar filter for larger screens */}
            <aside className="hidden md:block w-1/4 p-4 bg-white rounded-xl h-min">
                <h2 className="font-semibold text-lg mb-4 text-secondary">Filters</h2>
                <Divider />
                <div className="py-4">
                    <h3 className="font-bold">Industry</h3>
                    {industries.map((industry) => (
                        <div key={industry} className="flex items-center">
                            <input
                                type="checkbox"
                                checked={selectedIndustry === industry}
                                onChange={() => handleIndustryChange(industry)}
                                className="mr-2"
                            />
                            <label>{industry}</label>
                        </div>
                    ))}
                </div>
                <div>
                    <h3 className="font-bold">Location</h3>
                    {locations.map((location) => (
                        <div key={location} className="flex items-center">
                            <input
                                type="checkbox"
                                checked={selectedLocation === location}
                                onChange={() => handleLocationChange(location)}
                                className="mr-2"
                            />
                            <label>{location}</label>
                        </div>
                    ))}
                </div>
            </aside>

            <div className="w-full md:w-3/4">
                {/* Search Bar */}
                <div className="flex w-full mb-4 items-center gap-2">
                    <Button
                        isIconOnly
                        className="md:hidden bg-tertiary text-white"
                        onPress={onOpen}
                    >
                        <i className="pi pi-filter"/>
                    </Button>
                    <Input
                        label="Search companies"
                        value={search}
                        onChange={handleSearchChange}
                        onKeyDown={handleSearchEnter}
                    />
                </div>
                <h1 className="page-title">Explore Companies</h1>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                    {filteredCompanies && filteredCompanies.length > 0 ? (
                        filteredCompanies.map((company: Company) => (
                            <PublicCompanyCard key={company.id} company={company} isDetails={false} />
                        ))
                    ) : (
                        <p className="text-lg">No companies found for the selected filters.</p>
                    )}
                </div>

                <div className="flex justify-center mt-4">
                    <Pagination
                        total={Math.ceil((filteredCompanies?.length || 0) / limit)}
                        initialPage={page}
                        onChange={handlePageChange}
                        color="primary"
                        size="lg"
                    />
                </div>
            </div>
        </div>
    );
}

export default ExploreCompanies;
