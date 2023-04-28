import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useContext } from 'react';
import Header from '../../components/Header';
import { Install } from '../../typings';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import prisma from '../../db';
import { InstallsContext } from '../../context/InstallsContext';
import { Checkbox, Toolbar, Typography } from '@mui/material';

interface Props {
  campaignInstalls: Install[]
}

export const getStaticPaths: GetStaticPaths = async () => {

  const installs = await prisma.install.findMany();
  const campaigns: string[] = [];

  // iterates through installs to capture an array of campaign names currently in database
  for (let i = 0; i < installs.length; i++) {
    const campaign = installs[i].campaign;
    if (!campaigns.includes(campaign)) {
      campaigns.push(campaign);
    }
  }

  // all possible paths are now the campaign names
  const paths = campaigns.map((campaign) => ({
    params: {
      campaign
    },
  }))
  return { paths, fallback: 'blocking' }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const installs = await prisma.install.findMany();
  // filters installs to those matching the campaign passed into params
  const campaignInstalls = installs.filter((install) => install.campaign === params!.campaign);

  // returns filtered-down installs, to be passed to CampaignReport component as props
  return {
    props: {
      campaignInstalls,
    },
    revalidate: 60,
  }
};

export default function Report({ campaignInstalls }: Props): JSX.Element {

  console.log('campaign installs from props: ', campaignInstalls);

  const { installs } = useContext(InstallsContext);
  const stateInstalls: Install[] = installs.filter((installFromState: Install) => installFromState.campaign === campaignInstalls[0].campaign);
  console.log('campaign installs from state: ', stateInstalls);

  // const stateInstall = stateInstalls[0];

  let reportInstalls: Install[] = [];
  if (stateInstalls) reportInstalls = stateInstalls;

  console.log('report installs: ', reportInstalls);

  // let installComplete = "No";
  // if (install.complete === true) {
  //   installComplete = "Yes";
  // }

  // let revisitNeeded = "No";
  // if (install.revisitNeeded === true) {
  //   revisitNeeded = "Yes";
  // }

  // const router = useRouter();
  // const handleModify = (install: Install) => router.push(`/modify/${install.storeNum}`)

  // const handleDelete = (install: Install) => {

  //   const storeNumber: string = install.storeNum;

  //   const deleteOne = async () => {
  //     const response = await fetch(`/api/delete/${storeNumber}`);
  //     if (!response.ok) {
  //       throw new Error(response.statusText);
  //     }
  //     return await response.json();
  //   };

  //   deleteOne().then
  //     (data => alert(`Installation for store #${data.storeNum} has been deleted!`)).then
  //   router.push('/');
  // }

  return (
    <>
      <div className="relative flex justify-center h-full w-full px-6 py-4">
        <Header />

        <div className="flex flex-col items-center h-full w-full mt-[120px] pb-8 md:mx-auto">
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: '1400px' }}
              aria-label="simple table"
              stickyHeader
            >
              <TableHead>
                <TableRow>
                  <Toolbar
                    sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}
                  ><Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>{reportInstalls[0].campaign}</Typography>
                  </Toolbar>
                </TableRow>
                <TableRow>
                  <TableCell>Store Number</TableCell>
                  <TableCell align="left">Location</TableCell>
                  <TableCell align="left">Install Date</TableCell>
                  <TableCell align="left">Install Complete</TableCell>
                  <TableCell align="left">Revisit Needed</TableCell>
                  <TableCell align="left">Revisit Date</TableCell>
                  <TableCell align="left">Installer Notes</TableCell>
                  <TableCell align="left">PM Notes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {campaignInstalls.map((install) => (
                  <TableRow
                    key={install.storeNum}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {install.storeNum}
                    </TableCell>
                    <TableCell align="left">{install.location}</TableCell>
                    <TableCell align="left">{install.installDate}</TableCell>
                    <TableCell align="left">
                      <Checkbox checked={install.complete} />
                    </TableCell>
                    <TableCell align="left">
                      <Checkbox checked={install.revisitNeeded} />
                    </TableCell>
                    <TableCell align="left">{install.revisitDate}</TableCell>
                    <TableCell align="left">{install.installerNotes}</TableCell>
                    <TableCell align="left">{install.pmNotes}</TableCell>
                  </TableRow>
                ))}
                {/* <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">TOTAL
                  </TableCell>
                  <TableCell align="right">{cartQty}</TableCell>
                  <TableCell align="right">${cartPrice}</TableCell>
                </TableRow> */}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>

  );
}
